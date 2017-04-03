
    "use strict";

    // const HexandriaLogic = window.HexandriaLogic;
    // const HexandriaGraphics = window.HexandriaGraphics;
    import HexandriaLogic from "./hexandriaLogic";
    import HexandriaGraphics from "./hexandriaGraphics";

    import Mediator from "../modules/mediator";
    // const EVENTS = window.EVENTS;
    import { EVENTS } from "./events";

    export default class HexandriaGame {
        constructor(Mode, element, user) {
            console.log("HexandriaGame created");

            if (!(Mode.prototype instanceof HexandriaLogic)) {
                throw new TypeError("Mode is not a HexandriaLogic");
            }

            this.logic = new Mode();
            this.graphics = new HexandriaGraphics(element);


            (new Mediator()).subscribe(this, "drawMapEvent", "drawMap");
            (new Mediator()).subscribe(this, EVENTS.GAME.START, "gameStart");
        }
    }
