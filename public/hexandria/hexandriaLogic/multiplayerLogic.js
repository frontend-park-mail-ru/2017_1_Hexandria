import Router from '../../modules/router';
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

    destroy() {
        super.destroy();
        this.transport.close();
        delete this.transport;
    }

    _checkUser(playerName) {
        return (new Router()).getUser() === playerName;
    }

    eventTurn() {
        console.log('eventTurn (HexandriaLogicMultiplayer)');
        this.transport.send(EVENTS.GAME.TURN);
    }

    eventMove(data) {
        console.log('eventMove (HexandriaLogicMultiplayer)', data);
        this.transport.send(EVENTS.LOGIC.MOVE, data);
    }
}
