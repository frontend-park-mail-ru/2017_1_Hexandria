
    "use strict";

    // const HexandriaLogic = window.HexandriaLogic;
    // const HexandriaGraphics = window.HexandriaGraphics;
    //
    // const Mediator = window.Mediator;
    // const EVENTS = window.EVENTS;

    import HexandriaLogic from "./hexandriaLogic";
    import HexandriaGraphics from "./hexandriaGraphics";
    import Mediator from "../modules/mediator";
    import { EVENTS } from "./events";

    export default class HexandriaGame {
        constructor(Mode, element, user) {
            console.log("HexandriaGame created");

            if (!(Mode.prototype instanceof HexandriaLogic)) {
                throw new TypeError("Mode is not a HexandriaLogic");
            }

            this.init();

            this.logic = new Mode(this.game);
            this.graphics = new HexandriaGraphics(this.game, element);


            (new Mediator()).subscribe(this, "drawMapEvent", "drawMap");
        }

        init() {
            this.game = {
                field: {
                    size: {
                        x: 10,
                        y: 15
                    },
                    towns: [
                        {
                            name: "town1",
                            position: {
                                x: 0,
                                y: 0
                            }
                        },
                        {
                            name: "town2",
                            position: {
                                x: 2,
                                y: 3
                            }
                        },
                        {
                            name: "town3",
                            position: {
                                x: 7,
                                y: 8
                            }
                        },
                        {
                            name: "town4",
                            position: {
                                x: 9,
                                y: 14
                            }
                        }
                    ]
                },


                players: {
                    "Bob" : {
                        color: 0xff0000,
                        capital: "town1",
                        army: [
                            {
                                position: {
                                    x: 0,
                                    y: 0
                                }
                            }
                        ]
                    },
                    "John": {
                        color: 0x0000ff,
                        capital: "town4",
                        army: [
                            {
                                position: {
                                    x: 2,
                                    y: 2
                                }
                            }
                        ]
                    }
                }


            }
        }

        destroy() {
            this.game = null;
            this.logic = null;
            this.graphics = null;
            (new Mediator())._print();
        }
    }

