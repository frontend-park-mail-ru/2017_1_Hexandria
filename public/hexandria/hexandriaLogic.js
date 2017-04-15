'use strict';

import Mediator from '../modules/mediator';
import { EVENTS } from './events';
import HexandriaUtils from './hexandriaUtils';

export default class HexandriaLogic {
    constructor(game) {
        console.log('HexandriaLogic created');

        if (this.constructor.name === HexandriaLogic.name) {
            throw new TypeError('Can not create instance of HexandriaLogic');
        }


        this.game = game;
        this._selected = null;

        (new Mediator()).subscribe(this, EVENTS.KEYBOARD.ENTER_PRESSED, 'enterPressed');
        (new Mediator()).subscribe(this, EVENTS.TURN.START_TURN, 'gameLoop');

        (new Mediator()).subscribe(this, EVENTS.LOGIC.SELECT, 'onselect');
    }

    enterPressed() {
        if (this.userIndex === this.userIndexHuman) {
            console.log('Enter pressed');
        }
    }

    gameLoop(options) {
        console.log('start turn', options.userIndex);
    }

    startGameLoop() {
        /* this.userIndex = 0;
         this.interval = setInterval(() => {
         this.userIndex = (this.userIndex + 1) % 3;
         (new Mediator()).emit(EVENTS.TURN.START_TURN, { userIndex: this.userIndex });
         }, 3000);*/
    }

    onselect(position) {
        console.log('base', position);

        if (position) {
            if (this._selected) {
                if (this.checkNearSelected(position)) {
                    const pIndex = this._selected.playerIndex;
                    const sIndex = this._selected.squadIndex;


                    const army = this.findSquad(position);
                    console.log('->', army);
                    // if (army === enemy) {
                    //     // emit fight!
                    // }

                    const town = this.findTown(position);
                    console.log('->', town);
                    if (town) {
                        this.game.players[pIndex].towns.push(town.name);
                        console.log(this.game.players[pIndex].towns);
                        (new Mediator()).emit(EVENTS.GRAPHICS.CAPTURE, { player: this._selected.player, town });
                    }

                    (new Mediator()).emit(EVENTS.GRAPHICS.UNSELECT_ALL, null);
                    this._selected.squad.position = position;

                    this.game.players[pIndex].squads[sIndex].position.x = position.x;
                    this.game.players[pIndex].squads[sIndex].position.y = position.y;
                    (new Mediator()).emit(EVENTS.GRAPHICS.MOVE, this._selected);
                    this._selected = null;
                } else {
                    this._selected = null;
                    (new Mediator()).emit(EVENTS.GRAPHICS.UNSELECT_ALL, null);
                }
            } else {
                const army = this.findSquad(position);
                if (army) {
                    this._selected = army;
                    (new Mediator()).emit(EVENTS.GRAPHICS.SELECT_UNIT, this._selected.squad.position);
                }
            }
        } else {
            this._selected = null;
            (new Mediator()).emit(EVENTS.GRAPHICS.UNSELECT_ALL, null);
        }
    }

    findSquad(position) {
        let result = null;

        HexandriaUtils.forSquad(
            this.game,
            (object) => {
                if (object.squad.position.x === position.x &&
                    object.squad.position.y === position.y) {
                    result = object;
                }
            },
        );
        return result;
    }

    findTown(position) {
        let result = null;

        HexandriaUtils.forTown(
            this.game,
            (town) => {
                if (town.position.x === position.x &&
                    town.position.y === position.y) {
                    result = town;
                }
            },
        );
        return result;
    }

    checkNearSelected(position) {
        if (this._selected) {
            let result = [];

            const sPos = this._selected.squad.position;
            result.push({ x: sPos.x - 1, y: sPos.y });
            result.push({ x: sPos.x + 1, y: sPos.y });
            if (sPos.y % 2 === 1) {
                result.push({ x: sPos.x - 1, y: sPos.y - 1 });
                result.push({ x: sPos.x, y: sPos.y - 1 });
                result.push({ x: sPos.x - 1, y: sPos.y + 1 });
                result.push({ x: sPos.x, y: sPos.y + 1 });
            } else {
                result.push({ x: sPos.x + 1, y: sPos.y - 1 });
                result.push({ x: sPos.x, y: sPos.y - 1 });
                result.push({ x: sPos.x + 1, y: sPos.y + 1 });
                result.push({ x: sPos.x, y: sPos.y + 1 });
            }
            result = result.filter(element => element.x >= 0 && element.x < this.game.field.size.x && element.y >= 0 && element.y < this.game.field.size.y);

            let bool = false;
            result.forEach((element) => {
                if (element.x === position.x && element.y === position.y) {
                    bool = true;
                }
            });
            return bool;
        }
        return false;
    }
}
