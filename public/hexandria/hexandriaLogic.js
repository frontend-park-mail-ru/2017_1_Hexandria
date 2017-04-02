;(function() {
    "use strict";

    const Mediator = window.Mediator;
    const EVENTS = window.EVENTS;

    class HexandriaLogic {
        constructor(options) {
            console.log("HexandriaLogic created");

            if (this.constructor.name === HexandriaLogic.name) {
                throw new TypeError("Can not create instance of HexandriaLogic");
            }

            /* this.userIndexHuman = 0;
            this.sizeX = options.size.x;
            this.sizeY = options.size.y;
            console.log(this.sizeX, "x", this.sizeY);*/
            (new Mediator()).subscribe(this, EVENTS.KEYBOARD.ENTER_PRESSED, "enterPressed");
            (new Mediator()).subscribe(this, EVENTS.TURN.START_TURN, "gameLoop");
            // (new Mediator()).emit("drawMapEvent", { sizeX: this.sizeX, sizeY: this.sizeY });
        }

        enterPressed() {
            if (this.userIndex === this.userIndexHuman) {
                console.log("Enter pressed");
            }
        }

        gameLoop(options) {
            console.log("start turn", options.userIndex);
        }

        startGameLoop() {
            /* this.userIndex = 0;
            this.interval = setInterval(() => {
                this.userIndex = (this.userIndex + 1) % 3;
                (new Mediator()).emit(EVENTS.TURN.START_TURN, { userIndex: this.userIndex });
            }, 3000);*/
        }

    }

    window.HexandriaLogic = HexandriaLogic;
})();
