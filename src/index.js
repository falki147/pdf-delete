import Dropzone from "./Dropzone";
import Page from "./Page";
import PDFRenderer from "./PDFRenderer"
import PageSource from "./PageSource";
import { PDFDocument } from "pdf-lib";
import fileSaver from "file-saver";
import "../style/index.scss";
import SaveButton from "./SaveButton";

function initialize() {
    const pageContainer = document.createElement("div");
    pageContainer.classList.add("page-container");
    document.body.appendChild(pageContainer);

    const saveButton = new SaveButton();
    document.body.appendChild(saveButton.element);

    const dropzone = new Dropzone(document.body);
    const allPages = [];
    let filename = "";

    dropzone.onDrop(async file => {
        const data = await file.arrayBuffer();
        const renderer = await PDFRenderer.create(data);

        filename = file.name;

        const pages = [];

        for (let i = 0; i < renderer.length; ++i) {
            const page = new Page();
            page.source = new PageSource(data, i);
            pageContainer.appendChild(page.element);
            pages.push(page);
            allPages.push(page);
        }

        for (let i = 0; i < renderer.length; ++i) {
            pages[i].data = await renderer.get(i);
        }
    });

    saveButton.onClick(async () => {
        saveButton.loading = true;

        try {
            const getDocument = (() => {
                const documents = [];

                return async (src) => {
                    for (const document of documents) {
                        if (document.data === src) {
                            return document.doc;
                        }
                    }

                    const doc = await PDFDocument.load(src);
                    documents.push({ data: src, doc: doc });
                    return doc;
                };
            })();

            const doc = await PDFDocument.create();

            for (const page of allPages) {
                if (!page.deleted) {
                    await getDocument(page.source.documentSource);
                }
            }

            for (const page of allPages) {
                if (!page.deleted) {
                    const srcDoc = await getDocument(page.source.documentSource);
                    const pages = await doc.copyPages(srcDoc, [ page.source.page ]);
                    doc.addPage(pages[0]);
                }
            }

            const data = await doc.save();

            fileSaver.saveAs(new Blob([ data.buffer ]), filename);
        }
        finally {
            saveButton.loading = false;
        }
    });
}

initialize();
