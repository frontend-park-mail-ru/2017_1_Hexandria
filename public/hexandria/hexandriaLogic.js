;(function() {
    "use strict";

    const Mediator = window.Mediator;
    const EVENTS = window.EVENTS;

    class HexandriaLogic {
        constructor(game) {
            console.log("HexandriaLogic created");

            if (this.constructor.name === HexandriaLogic.name) {
                throw new TypeError("Can not create instance of HexandriaLogic");
            }


            this.game = game;
            this._selected = null;

            (new Mediator()).subscribe(this, EVENTS.KEYBOARD.ENTER_PRESSED, "enterPressed");
            (new Mediator()).subscribe(this, EVENTS.TURN.START_TURN, "gameLoop");

            (new Mediator()).subscribe(this, EVENTS.LOGIC.SELECT, "onselect");
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

        onselect(position) {
            console.log("base", position);

            if (position) {
                const army = this.findArmy(position);
                console.log("army", army);
                if (army) {
                    if (army !== this._selected) {
                        // TODO emit select
                        console.log("^SELECT^", army);

                        this._selected = army;
                        (new Mediator()).emit(EVENTS.GRAPHICS.HIGHLIGHT, this._selected.position);
                    } else {
                        console.log("else");
                        // TODO unselect old
                        // TODO select new
                    }
                } else {
                    if (this.checkNearSelected(position)) {
                        console.log("checkNearSelected", this._selected);
                        this._selected.position = position;

                        this.game.players[this._selected.name].army[this._selected.index].position.x = position.x;
                        this.game.players[this._selected.name].army[this._selected.index].position.y = position.y;

                        (new Mediator()).emit(EVENTS.GRAPHICS.MOVE, this._selected);
                        this._selected = null;
                    }

                    // TODO if near selected then move
                }
            } else {
                this._selected = null;
                (new Mediator()).emit(EVENTS.GRAPHICS.HIGHLIGHT, null);
                // TODO emit unselect
            }
        }

        findArmy(position) {
            let result = null;
            for (let playerName in this.game.players) {
                const playerColor = this.game.players[playerName].color;
                const playerArmy = this.game.players[playerName].army;


                // console.log(playerName, playerArmy);
                for (let index in playerArmy) {
                    const squad = playerArmy[index];
                    console.log("squad.position", squad.position, position);

                    if(squad.position.x === position.x &&
                        squad.position.y === position.y) {
                        console.log("TRUE");
                        //result = squad;
                        result = {
                            name: playerName,
                            index: index,
                            position: squad.position
                        };
                    }
                }
            }
            return result;
        }

        checkNearSelected(position) {
            if (this._selected) {
                console.log("position", position, this._selected.position.x - position.x);

                const deltaX = this._selected.position.x - position.x;
                const deltaY = this._selected.position.y - position.y;

                if (-1 <= deltaX && deltaX <= 1 &&
                    -1 <= deltaY && deltaY <= 1) {
                    console.log("move");
                    return true;
                } else {
                    console.log("stop");

                }
            }
            return false;
        }
    }

    window.HexandriaLogic = HexandriaLogic;
})();
