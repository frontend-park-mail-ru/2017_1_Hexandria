;(function () {
    "use strict";

    const View = window.View;
    const Button = window.Button;

    class LoginView extends View {
        constructor(options = {}) {
            super(options);

            const pageLogin = document.getElementById("login");

            // TODO in options
            // pageLogin.appendChild(new Title(titleData("Login")).el);

            // pageLogin.appendChild(new Button(backButtonData).render().on("click", backButtonClickDecorator()).el);
            const backButtonData = {
                text: "Back",
                attrs: {
                    class: "back-button",
                },
            };
            pageLogin.appendChild(new Button(backButtonData).render().el);
            // end TODO in options


            const loginForm = new Form({
                el: document.createElement("form"),
                data: {
                    controls: [
                        {
                            text: "Login",
                        },
                    ],
                    inputs: [
                        {
                            name: "login",
                            type: "text",
                            placeholder: "Enter Login",
                        },
                        {
                            name: "password",
                            type: "password",
                            placeholder: "Enter Password",
                        },
                    ],
                },
            });
            pageLogin.appendChild(loginForm.el);


            this._el = pageLogin;
            this.hide();
        }

        init(options = {}) {
        }
    }

    window.LoginView = LoginView;
})();
