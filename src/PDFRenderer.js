import PDFJS from "pdfjs-dist";
import PDFJSWorker from "file-loader!pdfjs-dist/build/pdf.worker.js";

// Make sure worker url is set
PDFJS.GlobalWorkerOptions.workerSrc = PDFJSWorker;

export default class PDFRenderer {
    constructor(doc) {
        const pages = [];
        const resolve = [];

        for (let i = 0; i < doc.numPages; ++i) {
            pages.push(new Promise(r => {
                resolve.push(r);
            }));
        }

        this._pages = pages;
        this._resolve = resolve;
        this._doc = doc;

        this._render();
    }

    get length() {
        return this._pages.length;
    }

    async get(index) {
        if (index < 0 || index >= this._pages.length)
            throw new Error("index out of bounds");

        return await this._pages[index];
    }

    async _render() {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        const destCanvas = document.createElement("canvas");
        const destContext = destCanvas.getContext("2d");

        for (let i = 0; i < this._doc.numPages; ++i) {
            const page = await this._doc.getPage(i + 1);
            const viewport = page.getViewport({ scale: 1 });
            const scale = this._calculateScale(viewport.width, viewport.height, 200, 200);

            canvas.width = viewport.width;
            canvas.height = viewport.height;

            await page.render({
                canvasContext: context,
                viewport: viewport
            }).promise;

            context.filter = "blur(2px)";
            context.drawImage(canvas, 0, 0, canvas.width, canvas.height);

            destCanvas.width = viewport.width * scale;
            destCanvas.height = viewport.height * scale;

            destContext.drawImage(canvas, 0, 0, destCanvas.width, destCanvas.height);

            this._resolve[i](destCanvas.toDataURL());
        }
    }

    static async create(data) {
        const doc = await PDFJS.getDocument(data).promise;
        return new PDFRenderer(doc);
    }

    _calculateScale(origWidth, origHeight, width, height) {
        return Math.min(width / origWidth, height / origHeight);
    }
};
