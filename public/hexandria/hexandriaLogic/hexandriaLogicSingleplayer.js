;(function () {
    "use strict";

    const HexandriaLogic = window.HexandriaLogic;

    class HexandriaLogicSingleplayer extends HexandriaLogic {
        constructor(options = {}) {
            super(options);
            console.log("HexandriaLogicSingleplayer");
        }
    }

    window.HexandriaLogicSingleplayer = HexandriaLogicSingleplayer;
})();
