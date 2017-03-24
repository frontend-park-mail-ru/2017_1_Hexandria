;(function () {
    "use strict";

    const View = window.View;
    const Button = window.Button;

    class SignupView extends View {
        constructor(options = {}) {
            super(options);

            const pageSignup = document.getElementById("signup");

            // TODO in options
            // pageLogin.appendChild(new Title(titleData("Login")).el);

            // pageLogin.appendChild(new Button(backButtonData).render().on("click", backButtonClickDecorator()).el);
            const backButtonData = {
                text: "Back",
                attrs: {
                    class: "back-button",
                },
            };
            pageSignup.appendChild(new Button(backButtonData).render().el);
            // end TODO in options


            const signupForm = new Form({
                el: document.createElement("form"),
                data: {
                    controls: [
                        {
                            text: "Signup",
                        },
                    ],
                    inputs: [
                        {
                            name: "login",
                            type: "text",
                            placeholder: "Enter login",
                        },
                        {
                            name: "email",
                            type: "text",
                            placeholder: "Enter e-mail",
                        },
                        {
                            name: "password",
                            type: "password",
                            placeholder: "Enter password",
                        },
                        {
                            name: "double_password",
                            type: "password",
                            placeholder: "Enter password second time",
                        },
                    ],
                },
            });
            pageSignup.appendChild(signupForm.el);


            this._el = pageSignup;
            this.hide();
        }

        init(options = {}) {
        }
    }

    window.SignupView = SignupView;
})();
