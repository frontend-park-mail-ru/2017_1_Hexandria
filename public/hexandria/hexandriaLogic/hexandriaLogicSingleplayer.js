;(function () {
    "use strict";

    const HexandriaLogic = window.HexandriaLogic;

    class HexandriaLogicSingleplayer extends HexandriaLogic {
        constructor(game) {
            super(game);
            console.log("HexandriaLogicSingleplayer");
        }

        onselect(position) {
            super.onselect(position);
            console.log("single", position);
        }
    }

    window.HexandriaLogicSingleplayer = HexandriaLogicSingleplayer;
})();
