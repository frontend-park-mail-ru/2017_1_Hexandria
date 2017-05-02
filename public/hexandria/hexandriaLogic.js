import Mediator from '../modules/mediator';
import { EVENTS } from './events';
import HexLogic from './hexandriaLogic/hexLogic';
import HexandriaUtils from './hexandriaUtils';

export default class HexandriaLogic {
    constructor(game) {
        console.log('HexandriaLogic created', game);

        if (this.constructor.name === HexandriaLogic.name) {
            throw new TypeError('Can not create instance of HexandriaLogic');
        }


        this.game = game;
        this._selected = null;

        const sizeX = this.game.field.size.x;
        const sizeY = this.game.field.size.y;
        this.field = [...Array(sizeX).keys()].map(i => Array(sizeY));
        for (let i = 0; i < sizeX; i++) {
            for (let j = 0; j < sizeY; j++) {
                // this.field[i][j] = i + j;
                this.field[i][j] = new HexLogic();
            }
        }

        (new Mediator()).subscribe(this, EVENTS.KEYBOARD.ENTER_PRESSED, 'enterPressed');
        (new Mediator()).subscribe(this, EVENTS.TURN.START_TURN, 'gameLoop');

        (new Mediator()).subscribe(this, EVENTS.LOGIC.SELECT, 'onSelect');
        (new Mediator()).subscribe(this, EVENTS.LOGIC.MOVE, 'onMove');
        (new Mediator()).subscribe(this, EVENTS.LOGIC.UPDATE, 'onUpdate');
        (new Mediator()).subscribe(this, EVENTS.LOGIC.DELETE, 'onDelete');
        (new Mediator()).subscribe(this, EVENTS.LOGIC.ATTACK_CAPITAL, 'onAttackCapital');
        (new Mediator()).subscribe(this, EVENTS.LOGIC.ATTACK_TOWN, 'onAttackTown');
    }

    destroy() {
        this.game = null;
        this._selected = null;
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
        console.log('onselect', position, this._selected);
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
    }

    eventMove(data) {
        console.log('');
        console.log('');
        console.log('eventMove', data);

        // squad fight/combine handler
        const to = this.findSquad(data.to);
        if (to) {
            const from = this.findSquad(data.from);

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
                // this.onUpdate(updateData);
                (new Mediator()).emit(EVENTS.LOGIC.UPDATE, updateData);

                const deleteData = HexandriaUtils.packToDelete(from);
                // this.onDelete(deleteData);
                (new Mediator()).emit(EVENTS.LOGIC.DELETE, deleteData);
            } else {
                const count = from.squad.count + sign(to.squad.count);
                const morale = from.squad.morale;

                // this.onMove(data);
                (new Mediator()).emit(EVENTS.LOGIC.MOVE, data);

                const updateData = HexandriaUtils.packToUpdate(from, count, morale);
                // this.onUpdate(updateData);
                (new Mediator()).emit(EVENTS.LOGIC.UPDATE, updateData);

                const deleteData = HexandriaUtils.packToDelete(to);
                // this.onDelete(deleteData);
                (new Mediator()).emit(EVENTS.LOGIC.DELETE, deleteData);
            }
        } else {
            // this.onMove(data);
            (new Mediator()).emit(EVENTS.LOGIC.MOVE, data);
        }

        // town handler
        const town = this.findTown(data.to);
        if (town) {
            const selected = this.findSquad(data.from);

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
                // this.onAttackCapital(attackCapitalData);
                (new Mediator()).emit(EVENTS.LOGIC.ATTACK_CAPITAL, attackCapitalData);
            } else if (t.length > 0) {
                console.log('t ->', t);
                if (t.length > 1) {
                    console.log('ERROR: t.length');
                }

                const enemyIndex = t[0];
                const attackTownData = HexandriaUtils.packToAttackTown(selected, enemyIndex, town);
                // this.onAttackTown(attackTownData);
                (new Mediator()).emit(EVENTS.LOGIC.ATTACK_TOWN, attackTownData);
            } else if (town.name !== selected.player.capital &&
                selected.player.towns.indexOf(town.name) === -1) {
                console.log('neutral');

                const attackTownData = HexandriaUtils.packToAttackTown(selected, -1, town);
                // this.onAttackTown(attackTownData);
                (new Mediator()).emit(EVENTS.LOGIC.ATTACK_TOWN, attackTownData);
            } else {
                // do nothing
                // this is our town
            }
        }
    }

    onMove(data) {
        console.log('');
        console.log('');
        console.log('onMove', data);
        const from = data.from;
        const to = data.to;


        console.log(
            'onMove field:',
            this.field,
            this.field[from.x][from.y],
        );

        const fromSquadObject = this.findSquad(data.from);
        console.log(fromSquadObject, to);
        fromSquadObject.squad.position.x = to.x;
        fromSquadObject.squad.position.y = to.y;

        const graphicsData = {
            playerName: fromSquadObject.player.name,
            squadIndex: fromSquadObject.squadIndex,
            position: data.to,
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

        const resultData = HexandriaUtils.packResult(this.game.players[playerIndex].name,
            this.game.players[enemyIndex].name);
        // console.log('game over', this.game.players[enemyIndex].name);
        console.log('game over', resultData);
        (new Mediator()).emit(EVENTS.GAME.RESULT, resultData);
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
