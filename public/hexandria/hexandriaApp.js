import Router from '../modules/router';
import Mediator from '../modules/mediator';
import { EVENTS } from './events';
import HexandriaGame from './hexandriaGame';
import HexandriaLogicSingleplayer from './hexandriaLogic/singleplayerLogic';
import HexandriaLogicMultiplayer from './hexandriaLogic/multiplayerLogic';

import HexandriaStartView from './hexandriaViews/hexandriaStartView';
import HexandriaPlayView from './hexandriaViews/hexandriaPlayView';
import HexandriaResultView from './hexandriaViews/hexandriaResultView';
import HexandriaFinishView from './hexandriaViews/hexandriaFinishView';

const MODES = {
    SINGLEPLAYER: HexandriaLogicSingleplayer,
    MULTIPLAYER: HexandriaLogicMultiplayer,
};

export default class HexandriaApp {
    constructor() {
        console.log('HexandriaApp');

        this.views = {
            start: new HexandriaStartView(),
            play: new HexandriaPlayView(),
            result: new HexandriaResultView(),
            finish: new HexandriaFinishView(),
        };

        this.mode = null;
        this.user = null;
        this.game = null;

        this._subscribe();
    }

    _subscribe() {
        (new Mediator()).subscribe(this, EVENTS.APP.INIT, 'init');
        (new Mediator()).subscribe(this, EVENTS.GAME.PLAY, 'gamePlay');
        (new Mediator()).subscribe(this, EVENTS.GAME.RESULT, 'gameResult');
        (new Mediator()).subscribe(this, EVENTS.APP.FINISH, 'gameFinish');

        this.views.play.subscribe();
    }
    _hideAll() {
        for (const v in this.views) {
            if (this.views[v]) {
                this.views[v].hide();
            }
        }
    }

    init(payload = {}) {
        console.log('init', payload);
        this._hideAll();

        if (!payload.mode) {
            console.error('Undefined mode');
            return;
        }

        this.views.start.refresh(payload);
        this.views.start.show();

        this.user = (new Router()).getUser();

        const _mode = (payload.mode || '').toUpperCase();
        this.mode = MODES[_mode];
        if (this.mode) { // TODO && this.user
            this.game = new HexandriaGame(this.mode, this.user);

            if (this.mode === MODES.SINGLEPLAYER) {
                (new Mediator()).emit(EVENTS.GAME.START, HexandriaGame.testGameStartData2());
                (new Mediator()).emit(EVENTS.GAME.PLAY);
            }
        } else {
            throw new TypeError(`gameStart error: mode=${this.mode}`);
        }
    }

    gamePlay(payload = {}) {
        console.log('gamePlay', payload);
        this._hideAll();
        this.views.play.show();
    }

    gameResult(payload = {}) {
        console.log('gameResult', payload);
        this._hideAll();

        this.views.result.refresh(payload);
        this.views.result.show();
    }

    gameFinish(payload = {}) {
        console.log('gameFinish', payload);
        this._hideAll();

        if (this.game) {
            this.game.destroy();
            this.game = null;

            // (new Mediator())._print();
            (new Mediator()).clear();
            // (new Mediator())._print();
            this._subscribe();
            (new Router()).go('/');
        }
    }
}

