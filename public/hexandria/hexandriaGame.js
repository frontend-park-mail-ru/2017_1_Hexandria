;(function() {
    "use strict";

    const HexandriaLogic = window.HexandriaLogic;
    const HexandriaGraphics = window.HexandriaGraphics;

    const Mediator = window.Mediator;
    const EVENTS = window.EVENTS;

    class HexandriaGame {
        constructor(Mode, element, user) {
            console.log("HexandriaGame created");

            if (!(Mode.prototype instanceof HexandriaLogic)) {
                throw new TypeError("Mode is not a HexandriaLogic");
            }

            this.logic = new Mode();
            this.graphics = new HexandriaGraphics(element);


            (new Mediator()).subscribe(this, "drawMapEvent", "drawMap");
            (new Mediator()).subscribe(this, EVENTS.GAME.START, "gameStart");
        }
    }

    window.HexandriaGame = HexandriaGame;
})();
