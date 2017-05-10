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
        console.log('HexandriaApp created');

        // this._el = document.getElementById('game');

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
        (new Mediator()).subscribe(this, EVENTS.GAME.START, 'gameStart');
        (new Mediator()).subscribe(this, EVENTS.GAME.PLAY, 'gamePlay');
        (new Mediator()).subscribe(this, EVENTS.GAME.RESULT, 'gameResult');
        (new Mediator()).subscribe(this, EVENTS.GAME.FINISH, 'gameFinish');

        this.views.play.subscribe();
    }
    _hideAll() {
        for (const v in this.views) {
            // console.log(v, this.views[v]);
            this.views[v].hide();
        }
    }

    gameStart(payload = {}) {
        console.log('gameStart', payload);
        this._hideAll();

        if (!payload.mode) {
            console.error('Undefined mode');
        }

        this.views.start.refresh(payload);
        this.views.start.show();

        const _mode = (payload.mode || '').toUpperCase();
        this.mode = MODES[_mode];

        this.user = (new Router()).getUser();
    }

    gamePlay(payload = {}) {
        console.log('gamePlay', payload);
        this._hideAll();// this.views.start.hide();
        this.views.play.show();

        // const _mode = (payload.mode || '').toUpperCase();
        // const mode = MODES[_mode];
        //
        // const user = (new Router()).getUser();

        if (this.mode) { // TODO && this.user
            this.game = new HexandriaGame(this.mode, this.user);
        } else {
            throw new TypeError(`gameStart error: mode=${this.mode}`);
        }
    }

    gameResult(payload = {}) {
        console.log('gameResult', payload);
        this._hideAll();// this.views.play.hide();

        this.views.result.refresh(payload);
        this.views.result.show();
    }

    // gameOver(payload = null) {
    //     console.log('gameOver');
    //     if (payload) {
    //         const winner = payload.player.name;
    //         console.log('winner', winner);
    //     }
    //
    //     (new Router()).go('/');
    // }

    gameFinish(payload = {}) {
        console.log('gameFinish', payload);
        this._hideAll();// this.views.result.hide();

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

