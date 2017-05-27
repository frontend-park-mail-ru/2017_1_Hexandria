import { API } from '../api';
import { EVENTS } from '../events';
import HexandriaLogic from '../hexandriaLogic';
import Transport from '../../modules/transport';

export default class HexandriaLogicMultiplayer extends HexandriaLogic {
    constructor() {
        super();
        console.log('HexandriaLogicMultiplayer');

        this.transport = new Transport(API.HOST);

    }

    startTimeout() {
        // do nothing
    }

    eventTurn() {
        console.log('');
        console.log('');
        console.log('eventTurn (HexandriaLogicMultiplayer)');
        this.transport.send(EVENTS.GAME.TURN);
    }

    eventMove(data) {
        console.log('');
        console.log('');
        console.log('eventMove (HexandriaLogicMultiplayer)', data);
        this.transport.send(EVENTS.LOGIC.MOVE, data);
    }
}
