;(function () {
    "use strict";

    const View = window.View;
    const Button = window.Button;
    const Router = window.Router;
    const Game = window.Game;

    const Mediator = window.Mediator;
    const EVENTS = window.EVENTS;

    class MultiplayerView extends View {
        constructor(options = {}) {
            super(options);

            const pageMultiplayer = document.getElementById("multiplayer");


            this.game = new Game();
            pageMultiplayer.appendChild(this.game.el);


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

        show(options = {}) {
            super.show();

            (new Mediator()).emit(
                EVENTS.GAME.INIT,
                {
                    mode: "singleplayer", // TODO multiplayer
                    element: "#multiplayer"
                }
            );
        }

        hide(options = {}) {
            super.hide();
            console.log("m hide");
            (new Mediator()).emit(EVENTS.GAME.EXIT);
        }
    }

    window.MultiplayerView = MultiplayerView;
})();
