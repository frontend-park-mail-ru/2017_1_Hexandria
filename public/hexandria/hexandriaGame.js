import Mediator from '../modules/mediator';
import Router from '../modules/router';
import { API } from './api';
import { EVENTS } from './events';
import HexandriaLogic from './hexandriaLogic';
import HexandriaLogicSingleplayer from './hexandriaLogic/singleplayerLogic';
import HexandriaGraphics from './hexandriaGraphics';
import HexandriaUtils from './hexandriaUtils';


export default class HexandriaGame {
    constructor(Mode, user) {
        console.log('HexandriaGame: user ', user);

        if (!(Mode.prototype instanceof HexandriaLogic)) {
            throw new TypeError('Mode is not a HexandriaLogic');
        }

        this._Mode = Mode;
        this.logic = new Mode();
        this.graphics = new HexandriaGraphics();

        this._started = false;

        this._subscribe();
    }

    _subscribe() {
        (new Mediator()).subscribe(this, EVENTS.GAME.START, '_onGameStart');
    }

    _onGameStart(data = {}) {
        if (this._started) {
            console.error('HexandriaGame._onGameStart: game already started.');
            return;
        }

        if (this._Mode === HexandriaLogicSingleplayer) {
            this.logic.initGame(HexandriaGame.testGameStartData());
            this.graphics.initGame(HexandriaGame.testGameStartData());
            return;
        }

        const game = {
            field: {
                size: {
                    x: data.sizeX,
                    y: data.sizeY,
                },
                towns: HexandriaUtils.copy(data.towns),
            },
            players: [],
        };
        game.field.towns.push(...HexandriaUtils.copy(data.capitals));

        for (const i in data.capitals) {
            if (data.capitals[i]) {
                const capital = data.capitals[i];

                const player = {
                    name: capital.owner.name,
                    color: i === '0' ? API.COLOR.GAME_1 : API.COLOR.GAME_2,
                    capital: capital.name,
                    towns: [],
                    squads: [
                        {
                            count: capital.squad.count,
                            morale: capital.squad.morale,
                            position: HexandriaUtils.copy(capital.position),
                        },
                    ],
                };
                game.players.push(player);
            }
        }

        this.logic.initGame(game);
        this.graphics.initGame(game);

        this._started = true;
    }

    static testGameStartData() {
        return {
            field: {
                size: {
                    x: 10,
                    y: 10,
                },
                towns: [
                    {
                        name: 'town1',
                        position: {
                            x: 0,
                            y: 0,
                        },
                    },
                    {
                        name: 'town2',
                        position: {
                            x: 1,
                            y: 4,
                        },
                    },
                    {
                        name: 'town3',
                        position: {
                            x: 4,
                            y: 1,
                        },
                    },
                    {
                        name: 'town4',
                        position: {
                            x: 8,
                            y: 5,
                        },
                    },
                    {
                        name: 'town5',
                        position: {
                            x: 5,
                            y: 8,
                        },
                    },
                    {
                        name: 'town6',
                        position: {
                            x: 9,
                            y: 9,
                        },
                    },
                ],
            },


            players: [
                {
                    name: `${(new Router()).getUser()}1`,
                    color: API.COLOR.GAME_1,
                    capital: 'town1',
                    towns: [],
                    squads: [
                        {
                            count: API.GAME.CAPITAL_COUNT,
                            morale: 10,
                            position: {
                                x: 0,
                                y: 0,
                            },
                        },
                    ],
                },
                {
                    name: `${(new Router()).getUser()}2`,
                    color: API.COLOR.GAME_2,
                    capital: 'town6',
                    towns: [],
                    squads: [
                        {
                            count: API.GAME.CAPITAL_COUNT,
                            morale: 10,
                            position: {
                                x: 9,
                                y: 9,
                            },
                        },
                    ],
                },
            ],
        };
    }

    static testGameStartData2() {
        return {
            sizeX: 10,
            sizeY: 15,
            towns: [
                {
                    position: {
                        x: 2,
                        y: 3,
                    },
                    name: 'Town1',
                },
                {
                    position: {
                        x: 7,
                        y: 8,
                    },
                    name: 'Town2',
                },
            ],
            capitals: [
                {
                    position: {
                        x: 0,
                        y: 0,
                    },
                    squad: {
                        count: 50,
                        morale: 30,
                        owner: {
                            name: 'TestAvatar1',
                        },
                    },
                    name: 'capital1',
                    owner: {
                        name: 'TestAvatar1',
                    },
                },
                {
                    position: {
                        x: 9,
                        y: 14,
                    },
                    squad: {
                        count: 50,
                        morale: 30,
                        owner: {
                            name: 'TestAvatar2',
                        },
                    },
                    name: 'capital2',
                    owner: {
                        name: 'TestAvatar2',
                    },
                },
            ],
        };
    }

    destroy() {
        if (this.logic) {
            this.logic.destroy();
            delete this.logic;
        }

        if (this.graphics) {
            this.graphics.destroy();
            delete this.graphics;
        }

        this._started = false;
    }
}
