export default class Page {
    constructor() {
        const element = document.createElement("div");
        element.classList.add("page", "loading");
        element.addEventListener("click", this._onClick.bind(this));
        this._element = element;
        this._source = null;
    }

    get element() {
        return this._element;
    }

    get source() {
        return this._source;
    }

    set source(value) {
        this._source = value;
    }

    get deleted() {
        return this._element.classList.contains("deleted");
    }

    set data(value) {
        const images = this._element.getElementsByTagName("img");
        let img;

        if (images.length === 0) {
            img = document.createElement("img");
            this._element.appendChild(img);
        }
        else {
            img = images[0];
        }

        img.src = value;
        this._element.classList.remove("loading");
    }

    get data() {
        const images = this._element.getElementsByTagName("img");
        return images.length ? images[0].src : null;
    }

    _onClick() {
        if (!this._element.classList.contains("loading")) {
            if (this._element.classList.contains("deleted")) {
                this._element.classList.remove("deleted");
            }
            else {
                this._element.classList.add("deleted");
            }
        }
    }
};
