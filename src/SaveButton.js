export default class SaveButton {
    constructor() {
        const text = document.createElement("span");
        text.innerText = "Save";

        const element = document.createElement("button");
        element.classList.add("save-button");
        element.appendChild(text);

        this._element = element;
    }

    get element() {
        return this._element;
    }

    get loading() {
        return this._element.disabled;
    }

    set loading(value) {
        this._element.disabled = value;
    }

    onClick(cb) {
        this._element.addEventListener("click", cb);
    }
};
