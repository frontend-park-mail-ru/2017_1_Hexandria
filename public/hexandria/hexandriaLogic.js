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
        console.log('onselect', position);

        if (position) {
            if (this._selected) {
                if (this.checkNearSelected(position)) {
                    (new Mediator()).emit(EVENTS.GRAPHICS.UNSELECT_ALL, null);
                    const pIndex = this._selected.playerIndex;
                    const sIndex = this._selected.squadIndex;

                    const toSquad = this.findSquad(position);
                    if (toSquad) {
                        this.combineSquad(this._selected, toSquad);
                    } else {
                        this._selected.squad.position = position;

                        this.game.players[pIndex].squads[sIndex].position.x = position.x;
                        this.game.players[pIndex].squads[sIndex].position.y = position.y;
                        (new Mediator()).emit(EVENTS.GRAPHICS.SQUAD_MOVE, this._selected);
                    }

                    const town = this.findTown(position);
                    if (town) {
                        this.townHandler(this._selected, town);

                        (new Mediator()).emit(EVENTS.GRAPHICS.TOWN_CAPTURE, { player: this._selected.player, town });
                    }

                    this._selected = null;
                } else {
                    this._selected = null;
                    (new Mediator()).emit(EVENTS.GRAPHICS.UNSELECT_ALL, null);
                }
            } else {
                const squad = this.findSquad(position);
                if (squad) {
                    this._selected = squad;
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

        HexandriaUtils.forPlayersSquads(
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

        HexandriaUtils.forFieldTowns(
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

    combineSquad(from, to) {
        let sign;
        if (from.player.name === to.player.name) {
            sign = function (a) {
                return a;
            };
        } else {
            sign = function (a) {
                return -a;
            };
        }

        if (to.squad.count > from.squad.count) {
            to.squad.count += sign(from.squad.count);
            from.squad.count = 0;

            // selected squad will be deleted

            (new Mediator()).emit(EVENTS.GRAPHICS.SQUAD_UPDATE, to);

            this.game.players[from.playerIndex].squads.splice(from.squadIndex, 1);
            (new Mediator()).emit(EVENTS.GRAPHICS.SQUAD_DELETE, from);
        } else {
            from.squad.count += sign(to.squad.count);
            to.squad.count = 0;

            // move selected squad
            from.squad.position.x = to.squad.position.x;
            from.squad.position.y = to.squad.position.y;
            (new Mediator()).emit(EVENTS.GRAPHICS.SQUAD_MOVE, from);

            (new Mediator()).emit(EVENTS.GRAPHICS.SQUAD_UPDATE, from);

            this.game.players[to.playerIndex].squads.splice(to.squadIndex, 1);
            (new Mediator()).emit(EVENTS.GRAPHICS.SQUAD_DELETE, to);
        }
    }

    townHandler(selected, town) {
        console.log('townHandler', selected, town);

        let flag = false;

        HexandriaUtils.forPlayers(
            this.game,
            (playerObject) => {
                if (flag === false) {
                    console.log('playerObject', playerObject);
                    if (town.name === playerObject.player.capital) {
                        if (selected.playerIndex !== playerObject.playerIndex) {
                            flag = true;
                            (new Mediator()).emit(EVENTS.GAME.EXIT);
                            console.log('game over');
                        } else {
                            flag = true;
                            console.log('do nothing');
                        }
                    }
                    const index = playerObject.player.towns.indexOf(town.name);
                    if (index !== -1) {
                        if (selected.playerIndex === playerObject.playerIndex) {
                            flag = true;
                            console.log('do nothing');
                        } else {
                            playerObject.player.towns.splice(index, 1);
                            selected.player.towns.push(town.name);
                            flag = true;
                            console.log('enemy town', playerObject.player, selected.player);
                        }
                    }
                }
            },
        );
        console.log('flag', flag);
        if (flag === false) {
            selected.player.towns.push(town.name);
            console.log('empty town');
        }
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
