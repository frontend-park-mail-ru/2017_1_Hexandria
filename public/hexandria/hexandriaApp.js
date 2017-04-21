import Router from '../modules/router';
import Mediator from '../modules/mediator';
import HexandriaLogicSingleplayer from './hexandriaLogic/singleplayerLogic';
import HexandriaLogicMultiplayer from './hexandriaLogic/multiplayerLogic';
import HexandriaGame from './hexandriaGame';
import { EVENTS } from './events';

const MODES = {
    SINGLEPLAYER: HexandriaLogicSingleplayer,
    MULTIPLAYER: HexandriaLogicMultiplayer,
};

export default class HexandriaApp {
    constructor() {
        console.log('HexandriaApp created');

        this.game = null;

        (new Mediator()).subscribe(this, EVENTS.GAME.INIT, 'gameInit');
        (new Mediator()).subscribe(this, EVENTS.GAME.OVER, 'gameOver');
        (new Mediator()).subscribe(this, EVENTS.GAME.EXIT, 'gameExit');
    }

    gameInit(payload = {}) {
        const _mode = (payload.mode || '').toUpperCase();
        const mode = MODES[_mode];

        const element = payload.element;

        const user = (new Router()).getUser();

        if (mode) {
            this.game = new HexandriaGame(mode, element, user);
        } else {
            throw new TypeError(`gameStart error: mode=${_mode}`);
        }
    }

    gameOver(payload = null) {
        console.log('gameOver');
        if (payload) {
            const winner = payload.player.name;
            console.log('winner', winner);
        }

        (new Router()).go('/');
    }

    gameExit() {
        console.log('gameExit');
        if (this.game) {
            this.game.destroy();
            this.game = null;

            // (new Mediator())._print();
            (new Mediator()).clear();
            // (new Mediator())._print();
            (new Mediator()).subscribe(this, EVENTS.GAME.INIT, 'gameInit');
            (new Mediator()).subscribe(this, EVENTS.GAME.EXIT, 'gameExit');
            (new Router()).go('/');
        }
    }
}

