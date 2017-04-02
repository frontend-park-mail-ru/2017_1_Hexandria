;(function () {
    "use strict";

    const View = window.View;
    const Button = window.Button;
    const Router = window.Router;

    class ScoreboardView extends View {
        constructor(options = {}) {
            super(options);

            const pageScoreboard = document.getElementById("scoreboard");

            const backButton = new Button({
                text: "Back",
                attrs: {
                    class: "back-button",
                },
                events: {
                    click: (event) => { (new Router()).go("/"); },
                },
            });
            pageScoreboard.appendChild(backButton.el);

            this._el = pageScoreboard;
            this.hide();
        }

        init(options = {}) {
        }
    }

    window.ScoreboardView = ScoreboardView;
})();