;(function () {
    "use strict";

    const View = window.View;
    const Button = window.Button;
    const Router = window.Router;

    class MultiplayerView extends View {
        constructor(options = {}) {
            super(options);

            const pageMultiplayer = document.getElementById("multiplayer");

            const backButton = new Button({
                text: "Back",
                attrs: {
                    class: "back-button",
                },
                events: {
                    click: (event) => { (new Router()).go("/"); },
                },
            });
            pageMultiplayer.appendChild(backButton.el);

            this._el = pageMultiplayer;
            this.hide();
        }

        init(options = {}) {
        }
    }

    window.MultiplayerView = MultiplayerView;
})();
