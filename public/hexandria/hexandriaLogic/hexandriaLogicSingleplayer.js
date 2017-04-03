

    // const HexandriaLogic = window.HexandriaLogic;
    import HexandriaLogic from "../hexandriaLogic";

    export default class HexandriaLogicSingleplayer extends HexandriaLogic {
        constructor(options = {}) {
            super(options);
            console.log("HexandriaLogicSingleplayer");
        }
    }