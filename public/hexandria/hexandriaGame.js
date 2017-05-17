import Mediator from '../modules/mediator';
import { EVENTS } from './events';
import HexandriaLogic from './hexandriaLogic';
import HexandriaGraphics from './hexandriaGraphics';
import HexandriaUtils from './hexandriaUtils';

export default class HexandriaGame {
    constructor(Mode, user) {
        console.log('HexandriaGame: user ', user);

        if (!(Mode.prototype instanceof HexandriaLogic)) {
            throw new TypeError('Mode is not a HexandriaLogic');
        }

        this.__Mode = Mode;
        this.logic = new Mode();
        this.graphics = new HexandriaGraphics();

        this._subscribe();
    }

    _subscribe() {
        (new Mediator()).subscribe(this, EVENTS.GAME.START, 'gameStart');
    }

    gameStart(data = {}) {
        console.log('');
        console.log('');
        console.log('');
        console.log('gameStart', data);

        if (this.__Mode.name === 'HexandriaLogicSingleplayer') {
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
                    color: i === '0' ? 0xff0000 : 0x0000ff,
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
    }

    static testGameStartData() {
        return {
            field: {
                size: {
                    x: 10,
                    y: 15,
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
                            x: 2,
                            y: 3,
                        },
                    },
                    {
                        name: 'town3',
                        position: {
                            x: 7,
                            y: 8,
                        },
                    },
                    {
                        name: 'town4',
                        position: {
                            x: 9,
                            y: 14,
                        },
                    },
                ],
            },


            players: [
                {
                    name: 'Bob',
                    color: 0xff0000,
                    capital: 'town1',
                    towns: ['town2'],
                    squads: [
                        {
                            count: 10,
                            morale: 5,
                            position: {
                                x: 1,
                                y: 1,
                            },
                        },
                        {
                            count: 20,
                            morale: 11,
                            position: {
                                x: 2,
                                y: 1,
                            },
                        },
                    ],
                },
                {
                    name: 'John',
                    color: 0x0000ff,
                    capital: 'town4',
                    towns: [],
                    squads: [
                        {
                            count: 41,
                            morale: 7,
                            position: {
                                x: 5,
                                y: 5,
                            },
                        },
                        {
                            count: 17,
                            morale: 20,
                            position: {
                                x: 3,
                                y: 4,
                            },
                        },
                        {
                            count: 50,
                            morale: 10,
                            position: {
                                x: 4,
                                y: 4,
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
    }
}
