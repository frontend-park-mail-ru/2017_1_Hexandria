;(function () {
    "use strict";

    const View = window.View;
    const Button = window.Button;

    class MultiplayerView extends View {
        constructor(options = {}) {
            super(options);

            const pageMultiplayer = document.getElementById("multiplayer");

            // TODO in options
            const backButtonData = {
                text: "Back",
                attrs: {
                    class: "back-button",
                },
            };
            pageMultiplayer.appendChild(new Button(backButtonData).render().el);
            // end TODO in options


            this._el = pageMultiplayer;
            this.hide();
        }

        init(options = {}) {
        }
    }

    window.MultiplayerView = MultiplayerView;
})();
