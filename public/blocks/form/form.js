(function() {
    'use strict';

    class Form {
        constructor({ data = [], el }) {
            this.data = data;
            this.el = el;
            this.render();
        }

        render() {
            this._updateHtml();
            // this._installControls();
        }

        _getFields() {
            let { fields = [] } = this.data;

            return fields.map(field => { return `
                <input type="${field.type}" name="${field.name}" 
                    placeholder="${field.placeholder}" class="form__input">
            `}).join(' ');
        }

        _updateHtml() {
            this.el.innerHTML = `
                <form class="form" onsubmit="return false">
                    ${this._getFields()}
                    <button type="button" class="form__button" id="login_submit">Login</button>
                </form>
            `;
        }
    }

    window.Form = Form;
})();