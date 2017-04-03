;(function () {
    "use strict";

    const HexandriaLogic = window.HexandriaLogic;

    class HexandriaLogicSingleplayer extends HexandriaLogic {
        constructor(game) {
            super(game);
            console.log("HexandriaLogicSingleplayer");
        }

        selectField(position) {
            super.selectField(position);
            console.log("single", position);
        }
    }

    window.HexandriaLogicSingleplayer = HexandriaLogicSingleplayer;
})();
