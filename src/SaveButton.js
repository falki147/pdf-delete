import Button from "./Button";

export default class SaveButton extends Button {
    constructor() {
        super("Save");
        this._element.classList.add("save-button");
    }

    get loading() {
        return this._element.disabled;
    }

    set loading(value) {
        this._element.disabled = value;
        
        if (value) {
            this._element.classList.add("loading");
        }
        else {
            this._element.classList.remove("loading");
        }
    }
};
