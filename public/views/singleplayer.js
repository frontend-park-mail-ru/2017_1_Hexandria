;(function () {
    "use strict";

    const View = window.View;
    const Button = window.Button;

    class SingleplayerView extends View {
        constructor(options = {}) {
            super(options);

            const pageSingleplayer = document.getElementById("singleplayer");

            const backButton = new Button({
                text: "Back",
                attrs: {
                    class: "back-button",
                },
                events: {
                    click: (event) => {(new Router()).go("/")}
                },
            });
            pageSingleplayer.appendChild(backButton.el);

            this._el = pageSingleplayer;
            this.hide();
        }

        init(options = {}) {
        }
    }

    window.SingleplayerView = SingleplayerView;
})();
