;(function() {
    "use strict";

    const HexandriaLogicSingleplayer = window.HexandriaLogicSingleplayer;
    const HexandriaLogicMultiplayer = window.HexandriaLogicMultiplayer;
    const HexandriaGame = window.HexandriaGame;

    const Router = window.Router;
    const Mediator = window.Mediator;
    const EVENTS = window.EVENTS;

    const MODES = {
        SINGLEPLAYER: HexandriaLogicSingleplayer,
        MULTIPLAYER: HexandriaLogicMultiplayer,
    };

    class HexandriaApp {
        constructor(options) {
            console.log("HexandriaApp created");

            this.game = null;

            (new Mediator()).subscribe(this, "drawMapEvent", "drawMap");
            (new Mediator()).subscribe(this, EVENTS.GAME.INIT, "gameInit");
            (new Mediator()).subscribe(this, EVENTS.GAME.EXIT, "gameExit");
        }

        gameInit(payload = {}) {
            const _mode = (payload.mode || "").toUpperCase();
            const mode = MODES[_mode];

            const element = payload.element;

            const user = (new Router()).getUser();

            if (mode) {
                this.game = new HexandriaGame(mode, element, user);
            } else {
                throw new TypeError(`gameStart error: mode=${_mode}`);
            }
        }

        gameExit(payload) {
            console.log("gameExit");
            /* this.game.destroy();
            this.game = null;*/
        }
    }

    window.HexandriaApp = HexandriaApp;
})();
