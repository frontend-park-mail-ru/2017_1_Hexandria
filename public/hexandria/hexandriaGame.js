import HexandriaLogic from './hexandriaLogic';
import HexandriaGraphics from './hexandriaGraphics';
import Mediator from '../modules/mediator';

export default class HexandriaGame {
    constructor(Mode, element, user) {
        console.log('HexandriaGame created', user);

        if (!(Mode.prototype instanceof HexandriaLogic)) {
            throw new TypeError('Mode is not a HexandriaLogic');
        }

        this.init();

        this.logic = new Mode(JSON.parse(this.gameString));
        this.graphics = new HexandriaGraphics(JSON.parse(this.gameString), element);
    }

    init() {
        this.game = {
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

        this.gameString = JSON.stringify(this.game);
    }

    destroy() {
        this.logic.destroy();
        this.graphics.destroy();

        delete this.logic;
        delete this.graphics;
    }
}
