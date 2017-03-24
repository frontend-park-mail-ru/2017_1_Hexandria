;(function () {
    "use strict";

    const View = window.View;
    const Button = window.Button;

    class AboutView extends View {
        constructor(options = {}) {
            super(options);

            const pageAbout = document.getElementById("about");

            // TODO in options
            const backButtonData = {
                text: "Back",
                attrs: {
                    class: "back-button",
                },
            };
            pageAbout.appendChild(new Button(backButtonData).render().el);
            // end TODO in options

            this._el = pageAbout;
            this.hide();
        }

        init(options = {}) {
        }
    }

    window.AboutView = AboutView;
})();
