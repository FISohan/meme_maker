class Inspector {
    constructor(obj) {
        this.obj = obj;
        this.properties = [];
        this.elements = [];
        //  this._generateElement();
    }

    _getProperty() {
        if (this.obj.isRenderInspectorElement === false) {
            for (const key in this.obj) {
                const value = this.obj[key];
                const type = typeof (value);
                const newProperty = new Property(key, type, value);
                this.properties.push(newProperty);
            }
        }
    }

    _generateInputElement(value, key) {
        const newInputElem = document.createElement('input');
        newInputElem.type = 'number';
        newInputElem.value = value;
        newInputElem.dataset.key = key;
        return newInputElem;
    }

    _generateInputLabelElement(value) {
        const newInputElem = document.createElement('label');
        newInputElem.innerText = `${value}:`;
        return newInputElem;
    }

    _generateButtonElement(){
        const newInputElem = document.createElement('button');
        newInputElem.innerText = `Delete`;
        newInputElem.addEventListener('click',()=>this._deleteInspector())
        return newInputElem;
    }

    _updateObjProperty(parentId) {
        const parent = document.getElementById(parentId);
        const inputElements = parent.querySelectorAll(":scope > .inputGroup > input");
        for (const inputElm of inputElements) {
            const key = inputElm.dataset.key;
            inputElm.addEventListener('input', (event) => {
                this.obj[key] = event.target.value;
            });
        }
    }

    generateElement() {
        this._getProperty();
        for (const property of this.properties) {
            if (property.type === 'number') {
                this.elements.push(this._generateInputLabelElement(property.key))
                this.elements.push(this._generateInputElement(property.value, property.key));
            }
        }
        this.elements.push(this._generateButtonElement());
    }

    renderElements(parentId) {
        this.generateElement();
        const parent = document.getElementById(parentId);
        const inputGroupDiv = document.createElement('div');
        inputGroupDiv.id = this.obj.id;
        inputGroupDiv.className = "inputGroup";
        inputGroupDiv.innerHTML = `<img src="${this.obj.img}" width="5%"/>`;
        for (const elm of this.elements) {
            inputGroupDiv.appendChild(elm);
        }
        if (this.obj.isRenderInspectorElement === false)
            parent.appendChild(inputGroupDiv);
        this.obj.isRenderInspectorElement = true;
        this._updateObjProperty(parentId);

    }

    _deleteInspector(){
        this.obj.active = false;
      const e = document.getElementById(this.obj.id);
      e.remove();
    }
}

class Property {
    constructor(key, type, value) {
        this.key = key;
        this.type = type;
        this.value = value;
    }
}