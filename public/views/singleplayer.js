;(function () {
    "use strict";

    const View = window.View;
    const Button = window.Button;

    class SingleplayerView extends View {
        constructor(options = {}) {
            super(options);

            const pageSingleplayer = document.getElementById("singleplayer");

            // TODO in options
            const backButtonData = {
                text: "Back",
                attrs: {
                    class: "back-button",
                },
            };
            pageSingleplayer.appendChild(new Button(backButtonData).render().el);
            // end TODO in options


            this._el = pageSingleplayer;
            this.hide();
        }

        init(options = {}) {
        }
    }

    window.SingleplayerView = SingleplayerView;
})();
