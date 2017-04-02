;(function () {
    "use strict";

    const HexandriaLogic = window.HexandriaLogic;

    class HexandriaLogicSingleplayer extends HexandriaLogic {
        constructor(game) {
            super(game);
            console.log("HexandriaLogicSingleplayer");
        }
    }

    window.HexandriaLogicSingleplayer = HexandriaLogicSingleplayer;
})();
