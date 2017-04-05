
    "use strict";

    import Mediator from "../modules/mediator";
    import { EVENTS } from "./events";

    export default class HexandriaLogic {
        constructor(game) {
            console.log("HexandriaLogic created");

            if (this.constructor.name === HexandriaLogic.name) {
                throw new TypeError("Can not create instance of HexandriaLogic");
            }


            this.game = game;
            this._selected = null;

            (new Mediator()).subscribe(this, EVENTS.KEYBOARD.ENTER_PRESSED, "enterPressed");
            (new Mediator()).subscribe(this, EVENTS.TURN.START_TURN, "gameLoop");

            (new Mediator()).subscribe(this, EVENTS.GRAPHICS.SELECT_FIELD, "selectField");
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

        selectField(position) {
            console.log("base", position);

            if (position) {
                const army = this.findArmy(position);
                console.log("army", army);
                if (army && army !== this._selected) {
                    // TODO emit select
                    console.log("^SELECT^", army);
                }
            } else {
                this._selected = null;
                // TODO emit unselect
            }
        }

        findArmy(position) {
            let result = null;
            for (let playerName in this.game.players) {
                this.game.players[playerName].army.some((squad) => {
                    console.log("squad.position", squad.position, position);
                    if(squad.position.x === position.x &&
                        squad.position.y === position.y) {
                        console.log("TRUE");
                        result = squad;
                    }
                });
            }
            return result;
        }
    }
