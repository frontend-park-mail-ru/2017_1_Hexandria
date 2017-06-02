import { API } from '../api';
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

        this._turnTimeout = setInterval(this.eventTurn.bind(this), API.GAME.TIMEOUT * 1000);
    }

    destroy() {
        super.destroy();

        if (this._turnTimeout) {
            clearInterval(this._turnTimeout);
        }
    }
}
