;(function () {
    "use strict";

    const HexandriaLogic = window.HexandriaLogic;

    class HexandriaLogicSingleplayer extends HexandriaLogic {
        constructor(game) {
            super(game);
            console.log("HexandriaLogicSingleplayer");
        }

        selectField(payload) {
            super.selectField(payload);
            console.log("single", payload);
        }
    }

    window.HexandriaLogicSingleplayer = HexandriaLogicSingleplayer;
})();
