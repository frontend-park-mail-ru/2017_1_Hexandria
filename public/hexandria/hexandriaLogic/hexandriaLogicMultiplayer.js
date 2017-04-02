;(function () {
    "use strict";

    const HexandriaLogic = window.HexandriaLogic;

    class HexandriaLogicMultiplayer extends HexandriaLogic {
        constructor(options = {}) {
            super(options);
            console.log("HexandriaLogicMultiplayer");
        }
    }

    window.HexandriaLogicMultiplayer = HexandriaLogicMultiplayer;
})();
