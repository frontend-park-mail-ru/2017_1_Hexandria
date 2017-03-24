;(function() {
    "use strict";

    class Form {
        /**
         * Form constructor
         * @param {Objects[]} data
         * @param {HTMLElement} el
         */
        constructor({ data = [], el }) {
            this.data = data;
            this.el = el;
            this.render();
        }

        /**
         * DOM update
         */
        render() {
            this.updateHtml();
            this.installInputs();
            this.installControls();
        }

        /**
         * Update HTML
         */
        updateHtml() {
            this.el.classList.add("form");
        }

        /**
         * Form inputs install
         */
        installInputs() {
            const { inputs = [] } = this.data;
            const validator = new Validator();

            inputs.forEach((data) => {
                const input = new Input(data).render();
                input.el.classList.add("form__input");
                input.on("blur", () => {
                    try {
                        validator.validate(input.el);
                    } catch (err) {
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

        /**
         * Add event listener
         * @param {event} type
         * @param {function} callback
         */
        on (type, callback) {
            this.el.addEventListener(type, callback);
        }

        /**
         * Form buttons install
         */
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
