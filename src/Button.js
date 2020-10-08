export default class Button {
    constructor(title, primary) {
        const text = document.createElement("span");
        text.innerText = title;

        const element = document.createElement("button");
        element.appendChild(text);

        if (!primary) {
            element.classList.add("secondary");
        }

        this._element = element;
    }

    get element() {
        return this._element;
    }

    onClick(cb) {
        this._element.addEventListener("click", cb);
    }
};
