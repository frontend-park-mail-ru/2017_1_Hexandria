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
			this.el.classList.add("form");
		}

		installInputs() {
			const { inputs = [] } = this.data;
			const validator = new Validator();

			inputs.forEach((data) => {
				const input = new Input(data).render();
				input.el.classList.add("form__input");
				input.on("blur", () => {
					try {
						validator.validate(input.el);
					}						catch (err) {
						console.log(err.message);
						input.colorInputBorder(input, "red");
						return;
					}
					input.colorInputBorder(input, "#fff");
				});
				input.on("click", () => {
					input.colorInputBorder(this, "#eb9300");
				});
				this.el.appendChild(input.el);
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
				this.el.appendChild(control.el);
			});
		}
    }

	window.Form = Form;
})();
