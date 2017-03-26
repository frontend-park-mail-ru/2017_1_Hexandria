(function() {
    "use strict";

    const Button = window.Button;

    class RegisterPanel {
        /**
         * Register panel constructor
         */
        constructor() {
            this.el = document.createElement("div");
            this._render();
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
        _render() {
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
            this.login = new Button({
                text: "Login",
                attrs: {
                    class: "register_panel__login",
                },
                events: {
                    click: (event) => {
                        (new Router()).go("/login");
                    }
                },
            });
            this.signup = new Button({
                text: "Signup",
                attrs: {
                    class: "register_panel__signup",
                },
                events: {
                    click: (event) => {
                        (new Router()).go("/signup");
                    }
                },
            });

            this.el.appendChild(this.login.el);
            this.el.appendChild(this.signup.el);
        }
    }

    window.RegisterPanel = RegisterPanel;
})();
