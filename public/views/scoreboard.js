;(function () {
    "use strict";

    const View = window.View;
    const Button = window.Button;

    class ScoreboardView extends View {
        constructor(options = {}) {
            super(options);

            const pageScoreboard = document.getElementById("scoreboard");

            // TODO in options
            const backButtonData = {
                text: "Back",
                attrs: {
                    class: "back-button",
                },
            };
            pageScoreboard.appendChild(new Button(backButtonData).render().el);
            // end TODO in options

            this._el = pageScoreboard;
            this.hide();
        }

        init(options = {}) {
        }
    }

    window.ScoreboardView = ScoreboardView;
})();
