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

        this.Mode = null;
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

    init(payload) {
        console.log('init', payload);
        this._hideAll();

        if (payload && payload.mode) {
            this.views.start.refresh(payload.mode);
            this.Mode = MODES[payload.mode.toUpperCase()];
            console.warn(this.Mode);
        } else if (this.Mode) {
            // same mode form last time
        } else {
            console.error('init error: unknown mode');
            return;
        }
        this.views.start.show();

        this.user = (new Router()).getUser();

        if (this.game) {
            this.gameFinish();
        }

        if (this.Mode) { // TODO && this.user
            this.game = new HexandriaGame(this.Mode, this.user);

            if (this.Mode === MODES.SINGLEPLAYER) {
                (new Mediator()).emit(EVENTS.GAME.START, HexandriaGame.testGameStartData2());
                (new Mediator()).emit(EVENTS.GAME.PLAY);
            }
        } else {
            console.error(`gameStart error: mode=${this.Mode}`);
            this.Mode = null;
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

    gameFinish() {
        console.log('gameFinish');
        this._hideAll();

        if (this.game) {
            this.game.destroy();
            this.game = null;

            // (new Mediator())._print();
            (new Mediator()).clear();
            // (new Mediator())._print();
            this._subscribe();
        }
    }
}

