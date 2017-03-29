;(function () {
    "use strict";

    const View = window.View;
    const Button = window.Button;
    const Router = window.Router;

    class AboutView extends View {
        constructor(options = {}) {
            super(options);

            const pageAbout = document.getElementById("about");

            const backButton = new Button({
                text: "Back",
                attrs: {
                    class: "back-button",
                },
                events: {
                    click: (event) => { (new Router()).go("/"); },
                },
            });
            pageAbout.appendChild(backButton.el);

            this._el = pageAbout;
            this.hide();
        }

        init(options = {}) {
        }
    }

    window.AboutView = AboutView;
})();
