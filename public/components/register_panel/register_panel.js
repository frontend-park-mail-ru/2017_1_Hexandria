;(function() {
    "use strict";

    const Button = window.Button;

    class RegisterPanel {
        /**
         * Register panel constructor
         * @param {HTMLElement} el
         * @param {Object[]} data
         */
        constructor({ el, data = [] }) {
            this.data = data;
            this.el = el;
            this.render();
        }

        hide() {
            this.el.style.visibility = "hidden";
        }

        show() {
            this.el.style.visibility = "visible";
        }

        /**
         * DOM update
         */
        render() {
            this.updateHtml();
            this.installControls();
        }

        /**
         * Update HTML
         */
        updateHtml() {
            this.el.setAttribute("class", "register_panel");
        }

        /**
         * Install register panel buttons
         */
        installControls() {
            this.login = new Button(this.data.login).render();
            this.signup = new Button(this.data.signup).render();

            this.el.appendChild(this.login.el);
            this.el.appendChild(this.signup.el);
        }
    }

    window.RegisterPanel = RegisterPanel;
})();
