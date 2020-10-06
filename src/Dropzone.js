export default class Dropzone {
    constructor(element) {
        element.addEventListener("drop", this._onDrop.bind(this));
        element.addEventListener("dragover", this._onDragOver.bind(this));
        
        this.enabled = true;
        this._callbacks = [];
    }

    onDrop(cb) {
        this._callbacks.push(cb);
    }

    _onDrop(ev) {
        if (!this.enabled) {
            return;
        }

        ev.preventDefault();

        if (ev.dataTransfer.items) {
            for (let i = 0; i < ev.dataTransfer.items.length; i++) {
                if (ev.dataTransfer.items[i].kind === 'file') {
                    this._trigger(ev.dataTransfer.items[i].getAsFile());
                }
            }
        }
        else {
            for (let i = 0; i < ev.dataTransfer.files.length; i++) {
                this._trigger(ev.dataTransfer.files[i]);
            }
        }
    }

    _onDragOver(ev) {
        if (this.enabled) {
            ev.preventDefault();
        }
    }

    _trigger(file) {
        for (const cb of this._callbacks) {
            cb.call(this, file);
        }
    }
};
