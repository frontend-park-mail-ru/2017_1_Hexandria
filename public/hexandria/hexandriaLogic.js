import Mediator from '../modules/mediator';
import { EVENTS } from './events';
import HexandriaUtils from './hexandriaUtils';

export default class HexandriaLogic {
    constructor() {
        console.log('HexandriaLogic');

        if (this.constructor === HexandriaLogic) {
            throw new TypeError('Can not create instance of HexandriaLogic');
        }

        this.TIMEOUT = 10; // seconds

        this.TOWN_COUNT = 15;
        this.TOWN_MORALE = 10;
        this.TOWN_COUNT_MAX = 3 * this.TOWN_COUNT;

        this.CAPITAL_COUNT = 50;
        this.CAPITAL_MORALE = 30;
        this.CAPITAL_COUNT_MAX = 3 * this.CAPITAL_COUNT;

        this.game = null;
        this._selected = null;
        this._activePlayer = null;
        this._turnTimeout = null;

        (new Mediator()).subscribe(this, EVENTS.UI.TURN_CLICK, '_onUiTurnClick');
        (new Mediator()).subscribe(this, EVENTS.GAME.TURN, '_onGameTurn');

        (new Mediator()).subscribe(this, EVENTS.LOGIC.SELECT, 'onSelect');
        (new Mediator()).subscribe(this, EVENTS.LOGIC.CREATE, 'onCreate');
        (new Mediator()).subscribe(this, EVENTS.LOGIC.UPDATE, 'onUpdate');
        (new Mediator()).subscribe(this, EVENTS.LOGIC.DELETE, 'onDelete');
        (new Mediator()).subscribe(this, EVENTS.LOGIC.ATTACK_TOWN, 'onAttackTown');
    }

    startTimeout() {
        console.error('override it!');
    }

    initGame(game) {
        this.game = game;

        this._onGameTurn();
        this._onGameTurn();

        this.eventInfo();
    }

    destroy() {
        this.game = null;
        this._selected = null;

        if (this._turnTimeout) {
            clearInterval(this._turnTimeout);
        }
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
                    this._selected.squad.lock = true;
                }
                this._selected = null;
                (new Mediator()).emit(EVENTS.GRAPHICS.UNSELECT_ALL);
            } else {
                const squadObject = this.findSquad(position);
                // console.warn(squad);
                if (squadObject &&
                    squadObject.player.turn &&
                    !squadObject.squad.lock &&
                    HexandriaUtils.checkUser(squadObject.player.name)) {
                    this._selected = squadObject;
                    (new Mediator()).emit(EVENTS.GRAPHICS.SELECT_UNIT, this._selected.squad.position);
                }
            }
        } else {
            this._selected = null;
            (new Mediator()).emit(EVENTS.GRAPHICS.UNSELECT_ALL);
        }


        const sq = this._activePlayer.squads.find(function(s) {
            return s.lock !== true;
        });
        if (!sq) {
            this.eventTurn();
        }
    }

    eventInfo() {
        const payload = JSON.parse(JSON.stringify(this.game.players));

        (new Mediator()).emit(EVENTS.GAME.INFO, payload);
    }

    eventTurn() {
        console.warn('+++++');
        HexandriaUtils.forFieldTowns(
            this.game,
            (townObj) => {
                HexandriaUtils.forPlayers(
                    this.game,
                    ({ playerIndex, player }) => {
                        if (player.capital === townObj.name) {
                            console.log('capital', player.name, townObj.name);

                            const playerSquad = player.squads.find(function(s) {
                                return s.position.x === townObj.position.x &&
                                    s.position.y === townObj.position.y;
                            });
                            if (playerSquad) {
                                if (playerSquad.count < this.CAPITAL_COUNT_MAX) {
                                    console.log('update', playerSquad);

                                    const updateData = HexandriaUtils.packToUpdate(
                                        { squad: playerSquad },
                                        playerSquad.count + this.CAPITAL_COUNT,
                                        playerSquad.morale, // + this.CAPITAL_MORALE,
                                    );
                                    (new Mediator()).emit(EVENTS.LOGIC.UPDATE, updateData);
                                }
                            } else {
                                console.log('create');

                                const createData = HexandriaUtils.packToCreate(
                                    player.name,
                                    townObj.position,
                                    this.CAPITAL_COUNT,
                                    this.CAPITAL_MORALE,
                                );
                                (new Mediator()).emit(EVENTS.LOGIC.CREATE, createData);
                            }
                        }

                        const playerTownObj = player.towns.find(function(t) {
                            return t === townObj.name;
                        });
                        if (playerTownObj) {
                            console.log('town', player.name, townObj.name);

                            const playerSquad = player.squads.find(function(s) {
                                return s.position.x === townObj.position.x &&
                                    s.position.y === townObj.position.y;
                            });
                            if (playerSquad) {
                                if (playerSquad.count < this.TOWN_COUNT_MAX) {
                                    console.log('update', playerSquad);

                                    const updateData = HexandriaUtils.packToUpdate(
                                        { squad: playerSquad },
                                        playerSquad.count + this.TOWN_COUNT,
                                        playerSquad.morale, // + this.TOWN_MORALE,
                                    );
                                    (new Mediator()).emit(EVENTS.LOGIC.UPDATE, updateData);
                                }
                            } else {
                                console.log('create');

                                const createData = HexandriaUtils.packToCreate(
                                    player.name,
                                    townObj.position,
                                    this.TOWN_COUNT,
                                    this.TOWN_MORALE,
                                );
                                (new Mediator()).emit(EVENTS.LOGIC.CREATE, createData);
                            }
                        }
                    },
                );
            },
        );
        console.warn('-----');

        (new Mediator()).emit(EVENTS.GAME.TURN);
    }

    eventMove(data) {
        console.log('');
        console.log('');
        console.log('eventMove', data);

        // squad fight/combine handler
        const from = this.findSquad(data.from);
        const to = this.findSquad(data.to);
        if (to) {
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

                const deleteData = HexandriaUtils.packToDelete(from);
                (new Mediator()).emit(EVENTS.LOGIC.DELETE, deleteData);

                const updateData = HexandriaUtils.packToUpdate(to, count, morale);
                (new Mediator()).emit(EVENTS.LOGIC.UPDATE, updateData);
            } else {
                const count = from.squad.count + sign(to.squad.count);
                const morale = from.squad.morale;

                const deleteData = HexandriaUtils.packToDelete(to);
                (new Mediator()).emit(EVENTS.LOGIC.DELETE, deleteData);

                const updateData = HexandriaUtils.packToUpdate(from, count, morale, data.to);
                (new Mediator()).emit(EVENTS.LOGIC.UPDATE, updateData);
            }
        } else {
            const updateData = HexandriaUtils.packToUpdate(from, from.squad.count, from.squad.morale, data.to);
            (new Mediator()).emit(EVENTS.LOGIC.UPDATE, updateData);
        }

        // town handler
        const town = this.findTown(data.to);
        const selected = this.findSquad(data.to);
        if (town && selected) {
            // const selected = this.findSquad(data.to);

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

                const attackTownData = HexandriaUtils.packToAttackTown(selected);
                (new Mediator()).emit(EVENTS.LOGIC.ATTACK_TOWN, attackTownData);

                const enemyIndex = c[0];
                const resultData = HexandriaUtils.packResult(selected.player.name,
                    this.game.players[enemyIndex].name);
                (new Mediator()).emit(EVENTS.GAME.RESULT, resultData);
            } else if (t.length > 0) {
                console.log('t ->', t);
                if (t.length > 1) {
                    console.log('ERROR: t.length');
                }

                const attackTownData = HexandriaUtils.packToAttackTown(selected);
                (new Mediator()).emit(EVENTS.LOGIC.ATTACK_TOWN, attackTownData);
            } else if (town.name !== selected.player.capital &&
                selected.player.towns.indexOf(town.name) === -1) {
                console.log('neutral');

                const attackTownData = HexandriaUtils.packToAttackTown(selected);
                (new Mediator()).emit(EVENTS.LOGIC.ATTACK_TOWN, attackTownData);
            } else {
                // do nothing
                // this is our town
            }
        }

        this.eventInfo();
    }

    _onUiTurnClick() {
        this.eventTurn();
    }

    _onGameTurn() {
        if (this._activePlayer) {
            this._activePlayer.squads.forEach(function(squad) {
                squad.lock = false;
            });
        }

        if (this.game.players[0].turn) {
            this.game.players[0].turn = false;

            this._activePlayer = this.game.players[1];
            this._activePlayer.turn = true;
        } else {
            this.game.players[1].turn = false;

            this._activePlayer = this.game.players[0];
            this._activePlayer.turn = true;
        }

        if (HexandriaUtils.checkUser(this._activePlayer.name)) {
            (new Mediator()).emit(EVENTS.UI.TURN_SHOW);
        } else {
            (new Mediator()).emit(EVENTS.UI.TURN_HIDE);
        }

        this.startTimeout();

        this.eventInfo();
    }

    onCreate(data) {
        console.log('');
        console.log('');
        console.log('onCreate', data);

        const player = this.game.players.find(function(p) {
            return p.name === data.owner;
        });
        if (player) {
            const newSquad = {
                count: data.count,
                morale: data.morale,
                position: data.position,
            };

            player.squads.push(newSquad);

            const createData = {
                name: player.name,
                color: player.color,
                squad: newSquad,
            };
            (new Mediator()).emit(EVENTS.GRAPHICS.SQUAD_CREATE, createData);
        }
    }

    onUpdate(data) {
        console.log('');
        console.log('');
        console.log('onUpdate', data);
        const position = data.position;
        const newPosition = data.newPosition;
        const newCount = data.newCount;
        const newMorale = data.newMorale;

        const squadObject = this.findSquad(position);
        if (!squadObject) {
            console.error('Can not find squad.');
            return;
        }


        // if (position.x !== newPosition.x || position.y !== newPosition.y) {
        if (newPosition) {
            console.log(squadObject, newPosition);
            squadObject.squad.position.x = newPosition.x;
            squadObject.squad.position.y = newPosition.y;

            const graphicsData = {
                playerName: squadObject.player.name,
                squadIndex: squadObject.squadIndex,
                position: newPosition,
            };
            (new Mediator()).emit(EVENTS.GRAPHICS.SQUAD_MOVE, graphicsData);
        }

        if (newCount || newMorale) {
            const playerIndex = squadObject.playerIndex;
            const squadIndex = squadObject.squadIndex;
            const squad = squadObject.squad;

            if (newCount) {
                this.game.players[playerIndex].squads[squadIndex].count = newCount;
            }
            if (newMorale) {
                this.game.players[playerIndex].squads[squadIndex].morale = newMorale;
            }

            const graphicsData = {
                playerName: this.game.players[playerIndex].name,
                squadIndex,
                squad,
            };
            (new Mediator()).emit(EVENTS.GRAPHICS.SQUAD_UPDATE, graphicsData);
        }
    }

    onDelete(data) {
        console.log('');
        console.log('');
        console.log('onDelete', data);
        const position = data.position;
        const squadObject = this.findSquad(position);
        if (!squadObject) {
            console.error('Can not find squad.');
            return;
        }

        this.game.players[squadObject.playerIndex].squads.splice(squadObject.squadIndex, 1);

        const graphicsData = {
            playerName: this.game.players[squadObject.playerIndex].name,
            squadIndex: squadObject.squadIndex,
        };
        (new Mediator()).emit(EVENTS.GRAPHICS.SQUAD_DELETE, graphicsData);
    }

    onAttackTown(data) {
        console.log('');
        console.log('');
        console.log('onAttackTown', data);

        const position = data.position;
        const newOwner = data.newOwner;

        const town = this.findTown(position);
        if (!town) {
            console.error('Can not find town.');
            return;
        }

        console.log(town);

        HexandriaUtils.forPlayers(
            this.game,
            ({ playerIndex, player }) => {
                const index = player.towns.indexOf(town.name);
                if (index !== -1) {
                    this.game.players[playerIndex].towns.splice(index, 1);
                }
            },
        );

        const newOwnerObject = this.game.players.find(function(p) {
            return p.name === newOwner;
        });

        console.log(newOwnerObject);

        newOwnerObject.towns.push(town.name);

        const graphicsData = {
            playerColor: newOwnerObject.color,
            townName: town.name,
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
