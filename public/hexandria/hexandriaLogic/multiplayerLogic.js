import { EVENTS } from '../events';
import HexandriaLogic from '../hexandriaLogic';
import Transport from '../../modules/transport';

export default class HexandriaLogicMultiplayer extends HexandriaLogic {
    constructor(game) {
        super(game);
        console.log('HexandriaLogicMultiplayer');

        this.transport = new Transport();
    }

    eventMove(data) {
        console.log('');
        console.log('');
        console.log('eventMove (HexandriaLogicMultiplayer)', data);
        this.transport.send(EVENTS.LOGIC.MOVE, data);
    }
}
