import Mediator from '../../modules/mediator';
import { API } from '../api';
import { EVENTS } from '../events';
import HexandriaLogic from '../hexandriaLogic';
import HexandriaUtils from '../hexandriaUtils';

export default class HexandriaLogicSingleplayer extends HexandriaLogic {
    constructor() {
        super();
        console.log('HexandriaLogicSingleplayer');
    }

    destroy() {
        super.destroy();

        if (this._turnTimeout) {
            clearInterval(this._turnTimeout);
        }
    }

    _startTimeout() {
        if (this._turnTimeout) {
            clearInterval(this._turnTimeout);
        }

        this._turnTimeout = setInterval(this.eventTurn.bind(this), API.GAME.TIMEOUT * 1000);
    }

    _checkUser() {
        return true;
    }

    eventTurn() {
        this._locker = false;

        HexandriaUtils.forFieldTowns(
            this.game,
            (townObj) => {
                HexandriaUtils.forPlayers(
                    this.game,
                    ({ playerIndex, player }) => {
                        if (player.capital === townObj.name) {
                            // console.log('capital', player.name, townObj.name);

                            const playerSquad = player.squads.find(function(s) {
                                return s.position.x === townObj.position.x &&
                                    s.position.y === townObj.position.y;
                            });
                            if (playerSquad) {
                                if (playerSquad.count < API.GAME.CAPITAL_COUNT_MAX) {
                                    // console.log('update', playerSquad);

                                    const updateData = HexandriaUtils.packToUpdate(
                                        { squad: playerSquad },
                                        playerSquad.count + API.GAME.CAPITAL_COUNT,
                                        playerSquad.morale,
                                    );
                                    (new Mediator()).emit(EVENTS.LOGIC.UPDATE, updateData);
                                }
                            } else {
                                // console.log('create');

                                const createData = HexandriaUtils.packToCreate(
                                    player.name,
                                    townObj.position,
                                    API.GAME.CAPITAL_COUNT,
                                    API.GAME.CAPITAL_MORALE,
                                );
                                (new Mediator()).emit(EVENTS.LOGIC.CREATE, createData);
                            }
                        }

                        const playerTownObj = player.towns.find(function(t) {
                            return t === townObj.name;
                        });
                        if (playerTownObj) {
                            // console.log('town', player.name, townObj.name);

                            const playerSquad = player.squads.find(function(s) {
                                return s.position.x === townObj.position.x &&
                                    s.position.y === townObj.position.y;
                            });
                            if (playerSquad) {
                                if (playerSquad.count < API.GAME.TOWN_COUNT_MAX) {
                                    // console.log('update', playerSquad);

                                    const updateData = HexandriaUtils.packToUpdate(
                                        { squad: playerSquad },
                                        playerSquad.count + API.GAME.TOWN_COUNT,
                                        playerSquad.morale,
                                    );
                                    (new Mediator()).emit(EVENTS.LOGIC.UPDATE, updateData);
                                }
                            } else {
                                // console.log('create');

                                const createData = HexandriaUtils.packToCreate(
                                    player.name,
                                    townObj.position,
                                    API.GAME.TOWN_COUNT,
                                    API.GAME.TOWN_MORALE,
                                );
                                (new Mediator()).emit(EVENTS.LOGIC.CREATE, createData);
                            }
                        }
                    },
                );
            },
        );

        console.error('eventTurn');
        (new Mediator()).emit(EVENTS.GAME.TURN);
    }

    eventMove(data) {
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
}
