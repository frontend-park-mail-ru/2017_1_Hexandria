/* eslint-disable no-lonely-if */
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
        this.gameOver = null;

        (new Mediator()).subscribe(this, EVENTS.KEYBOARD.ENTER_PRESSED, 'enterPressed');
        (new Mediator()).subscribe(this, EVENTS.TURN.START_TURN, 'gameLoop');

        (new Mediator()).subscribe(this, EVENTS.LOGIC.SELECT, 'onSelect');
        // TODO (new Mediator()).subscribe(this, EVENTS.LOGIC.MOVE, 'onmove');
        // TODO (new Mediator()).subscribe(this, EVENTS.LOGIC.UPDATE, 'onupdate');
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

    onSelect(position) {
        console.log('');
        console.log('');
        console.log('');
        console.log('onselect', position);
        // throw new TypeError('Not implemented');

        if (position) {
            if (this._selected) {
                if (this.checkNearSelected(position)) {
                    const data = HexandriaUtils.packToMove(this._selected, position);
                    this.eventMove(data);
                }
                this._selected = null;
                (new Mediator()).emit(EVENTS.GRAPHICS.UNSELECT_ALL);
            } else {
                const squad = this.findSquad(position);
                if (squad) {
                    this._selected = squad;
                    (new Mediator()).emit(EVENTS.GRAPHICS.SELECT_UNIT, this._selected.squad.position);
                }
            }
        } else {
            this._selected = null;
            (new Mediator()).emit(EVENTS.GRAPHICS.UNSELECT_ALL);
        }

        if (this.gameOver) {
            (new Mediator()).emit(EVENTS.GAME.OVER, this.gameOver);
        }
    }

    eventMove(data) {
        console.log('');
        console.log('');
        console.log('eventMove', data);

        const pIndex = data.playerIndex;
        const sIndex = data.squadIndex;
        const position = data.moveTo;

        // squad fight/combine handler
        const to = this.findSquad(position);
        if (to) {
            const from = {
                playerIndex: data.playerIndex,
                player: this.game.players[pIndex],
                squadIndex: data.squadIndex,
                squad: this.game.players[pIndex].squads[sIndex],
            };

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
                const count = to.squad.count + sign(from.squad.count);
                const morale = to.squad.morale;

                const updateData = HexandriaUtils.packToUpdate(to, count, morale);
                this.onUpdate(updateData);

                const deleteData = HexandriaUtils.packToDelete(from);
                this.onDelete(deleteData);
            } else {
                const count = from.squad.count + sign(to.squad.count);
                const morale = from.squad.morale;

                this.onMove(data);

                const updateData = HexandriaUtils.packToUpdate(from, count, morale);
                this.onUpdate(updateData);

                const deleteData = HexandriaUtils.packToDelete(to);
                this.onDelete(deleteData);
            }
        } else {
            this.onMove(data);
        }

        // town handler
        const town = this.findTown(position);
        if (town) {
            const selected = {
                playerIndex: data.playerIndex,
                player: this.game.players[pIndex],
                squadIndex: data.squadIndex,
                squad: this.game.players[pIndex].squads[sIndex],
            };

            console.log('townHandler', selected, town);

            const c = [];
            const t = [];

            HexandriaUtils.forPlayers(
                this.game,
                (playerObject) => {
                    if (selected.playerIndex !== playerObject.playerIndex) {
                        if (town.name === playerObject.player.capital) {
                            c.push(playerObject.playerIndex);
                        }

                        const index = playerObject.player.towns.indexOf(town.name);
                        if (index !== -1) {
                            t.push(playerObject.playerIndex);
                        }
                    }
                },
            );

            if (c.length > 0 && t.length > 0) {
                console.log('ERROR: capital and town at the same time');
            } else if (c.length > 0) {
                console.log('c ->', c);
                if (c.length > 1) {
                    console.log('ERROR: c.length');
                }

                const enemyIndex = c[0];
                const attackCapitalData = HexandriaUtils.packToAttackCapital(selected, enemyIndex, town);
                this.onAttackCapital(attackCapitalData);
            } else if (t.length > 0) {
                console.log('t ->', t);
                if (t.length > 1) {
                    console.log('ERROR: t.length');
                }

                const enemyIndex = t[0];
                const attackTownData = HexandriaUtils.packToAttackTown(selected, enemyIndex, town);
                this.onAttackTown(attackTownData);
            } else if (town.name !== selected.player.capital &&
                selected.player.towns.indexOf(town.name) === -1) {
                console.log('neutral');

                const attackTownData = HexandriaUtils.packToAttackTown(selected, -1, town);
                this.onAttackTown(attackTownData);
            } else {
                // do nothing
                // this is our town
            }
        }
    }

    onMove(data) {
        const playerIndex = data.playerIndex;
        const squadIndex = data.squadIndex;
        const position = data.moveTo;

        this.game.players[playerIndex].squads[squadIndex].position.x = position.x;
        this.game.players[playerIndex].squads[squadIndex].position.y = position.y;

        const graphicsData = {
            playerName: this.game.players[playerIndex].name,
            squadIndex,
            position,
        };
        (new Mediator()).emit(EVENTS.GRAPHICS.SQUAD_MOVE, graphicsData);
    }

    onUpdate(data) {
        console.log('');
        console.log('');
        console.log('onUpdate', data);
        const playerIndex = data.playerIndex;
        const squadIndex = data.squadIndex;
        const squad = data.squad;

        this.game.players[playerIndex].squads[squadIndex].count = squad.count;
        this.game.players[playerIndex].squads[squadIndex].morale = squad.morale;


        const graphicsData = {
            playerName: this.game.players[playerIndex].name,
            squadIndex,
            squad,
        };
        (new Mediator()).emit(EVENTS.GRAPHICS.SQUAD_UPDATE, graphicsData);
    }

    onDelete(data) {
        console.log('');
        console.log('');
        console.log('onDelete', data);
        const playerIndex = data.playerIndex;
        const squadIndex = data.squadIndex;
        this.game.players[playerIndex].squads.splice(squadIndex, 1);

        const graphicsData = {
            playerName: this.game.players[playerIndex].name,
            squadIndex,
        };
        (new Mediator()).emit(EVENTS.GRAPHICS.SQUAD_DELETE, graphicsData);
    }

    onAttackCapital(data) {
        console.log('');
        console.log('');
        console.log('onAttackCapital', data);
        const playerIndex = data.playerIndex;
        const enemyIndex = data.enemyIndex;
        const townName = data.townName;

        this.game.players[playerIndex].towns.push(townName);

        const graphicsData = {
            playerColor: this.game.players[playerIndex].color,
            townName,
        };
        (new Mediator()).emit(EVENTS.GRAPHICS.TOWN_CAPTURE, graphicsData);

        console.log('game over', this.game.players[enemyIndex].name);
        (new Mediator()).emit(EVENTS.GAME.OVER, this.gameOver);
    }

    onAttackTown(data) {
        console.log('');
        console.log('');
        console.log('EVENTattackTown', data);
        const playerIndex = data.playerIndex;
        const enemyIndex = data.enemyIndex;
        const townName = data.townName;

        if (enemyIndex !== -1) {
            const townIndex = this.game.players[enemyIndex].towns.indexOf(townName);
            console.log('enemyTown', townIndex);
            this.game.players[enemyIndex].towns.splice(townIndex, 1);
        }
        this.game.players[playerIndex].towns.push(townName);

        const graphicsData = {
            playerColor: this.game.players[playerIndex].color,
            townName,
        };
        (new Mediator()).emit(EVENTS.GRAPHICS.TOWN_CAPTURE, graphicsData);
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
/*
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
                            this.gameOver = this._selected;
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
*/
    checkNearSelected(position) {
        if (this._selected) {
            const result = HexandriaUtils.nearElements(this.game.field.size.x, this.game.field.size.y, this._selected.squad.position);

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
