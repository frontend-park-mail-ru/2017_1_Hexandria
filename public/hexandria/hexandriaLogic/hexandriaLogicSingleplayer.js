
    "use strict";

    // const HexandriaLogic = window.HexandriaLogic;
	import HexandriaLogic from "../hexandriaLogic";

    export default class HexandriaLogicSingleplayer extends HexandriaLogic {
        constructor(game) {
            super(game);
            console.log("HexandriaLogicSingleplayer");
        }

        selectField(position) {
            super.selectField(position);
            console.log("single", position);
        }
    }