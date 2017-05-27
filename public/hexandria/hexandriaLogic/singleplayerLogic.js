import HexandriaLogic from '../hexandriaLogic';

export default class HexandriaLogicSingleplayer extends HexandriaLogic {
    constructor() {
        super();
        console.log('HexandriaLogicSingleplayer');
    }

    startTimeout() {
        if (this._turnTimeout) {
            clearInterval(this._turnTimeout);
        }

        this._turnTimeout = setInterval(this.eventTurn.bind(this), this.TIMEOUT * 1000);
    }
}
