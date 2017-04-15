import HexandriaLogic from '../hexandriaLogic';

export default class HexandriaLogicSingleplayer extends HexandriaLogic {
    constructor(game) {
        super(game);
        console.log('HexandriaLogicSingleplayer');
    }

    onselect(position) {
        super.onselect(position);
        console.log('single', position);
    }
}
