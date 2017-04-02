;(function () {
    "use strict";

    const HexandriaLogic = window.HexandriaLogic;

    class HexandriaLogicMultiplayer extends HexandriaLogic {
        constructor(game) {
            super(game);
            console.log("HexandriaLogicMultiplayer");
        }
    }

    window.HexandriaLogicMultiplayer = HexandriaLogicMultiplayer;
})();
