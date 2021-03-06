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

        this._Mode = null;
        this.user = null;
        this.game = null;

        this._subscribe();
    }

    _subscribe() {
        (new Mediator()).subscribe(this, EVENTS.APP.INIT, '_onAppInit');
        (new Mediator()).subscribe(this, EVENTS.GAME.START, '_onGameStart');
        (new Mediator()).subscribe(this, EVENTS.GAME.RESULT, '_onGameResult');
        (new Mediator()).subscribe(this, EVENTS.APP.FINISH, '_onAppFinish');

        this.views.start.subscribe();
        this.views.play.subscribe();
    }

    _hideAll() {
        for (const v in this.views) {
            if (this.views[v]) {
                this.views[v].hide();
            }
        }
    }

    _onAppInit(payload) {
        console.log('_onAppInit', payload);
        this._hideAll();

        if (payload && payload.mode) {
            this._Mode = MODES[payload.mode.toUpperCase()];
        } else if (this._Mode) {
            // same mode form last time
        } else {
            console.error('init error: unknown mode');
            return;
        }

        if (this.game) {
            this._onAppFinish();
        }
        this.views.start.show();

        this.user = (new Router()).getUser();

        if (this._Mode) { // TODO && this.user
            this.game = new HexandriaGame(this._Mode, this.user);

            if (this._Mode === MODES.SINGLEPLAYER) {
                (new Mediator()).emit(EVENTS.GAME.START, HexandriaGame.testGameStartData2());
            }
        } else {
            console.error(`gameStart error: mode=${this._Mode}`);
            this._Mode = null;
        }
    }

    _onGameStart(payload = {}) {
        console.log('_onGameStart', payload);
        this._hideAll();
        this.views.play.show();
    }

    _onGameResult(payload = {}) {
        console.log('_onGameResult', payload);
        this._hideAll();

        this.views.result.refresh(payload);
        this.views.result.show();
    }

    _onAppFinish() {
        console.log('_onAppFinish');
        this._hideAll();

        if (this.game) {
            this.game.destroy();
            delete this.game;

            // (new Mediator())._print();
            (new Mediator()).clear();
            // (new Mediator())._print();
            this._subscribe();
        }
    }
}
