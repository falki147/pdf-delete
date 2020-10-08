export default class Button {
    constructor(title) {
        const text = document.createElement("span");
        text.innerText = title;

        const element = document.createElement("button");
        element.appendChild(text);

        this._element = element;
    }

    get element() {
        return this._element;
    }

    onClick(cb) {
        this._element.addEventListener("click", cb);
    }
};
