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
			this.installInputs();
			this.installControls();
		}

		updateHtml() {
			this.el.innerHTML = `
                <form class="form" onsubmit="return false"></form>
            `;
		}

		installInputs() {
			const { inputs = [] } = this.data;

			inputs.forEach((data) => {
				const input = new Input(data).render();
				input.el.classList.add("form__input");
				this.el.querySelector("form").appendChild(input.el);
			});
		}

		on (type, callback) {
			this.el.addEventListener(type, callback);
		}

		installControls () {
			const { controls = [] } = this.data;

			controls.forEach((data) => {
				const control = new Button(data).render();
				control.el.classList.add("form__button");
				this.el.querySelector("form").appendChild(control.el);
			});
		}
    }

	window.Form = Form;
})();
