(function() {
	"use strict";

	class Form {
		constructor({ data = [], el }) {
			this.data = data;
			this.el = el;
			this.render();
		}

		render() {
			this.updateHtml();
            // this._installControls();
		}

		getFields() {
			const { fields = [] } = this.data;

			return fields.map(field => `
                <input type="${field.type}" name="${field.name}" 
                    placeholder="${field.placeholder}" class="form__input">
            `).join(" ");
		}

		updateHtml() {
			this.el.innerHTML = `
                <form class="form" onsubmit="return false">
                    ${this.getFields()}
                    <button type="button" class="form__button" id="login_submit">Login</button>
                </form>
            `;
		}
    }

	window.Form = Form;
})();
