'use strict';

import View from '../modules/view';
import Router from '../modules/router';
import Button from '../components/button/button';
import Game from '../components/game/game';
import Mediator from '../modules/mediator';
import { EVENTS } from '../hexandria/events';

export default class SingleplayerView extends View {
    constructor(options = {}) {
        super(options);

        const pageSingleplayer = document.getElementById('singleplayer');


        this.game = new Game();
        pageSingleplayer.appendChild(this.game.el);


        const backButton = new Button({
            text: 'Back',
            attrs: {
                class: 'back-button',
            },
            events: {
                click: (event) => { (new Router()).go('/'); },
            },
        });


        pageSingleplayer.appendChild(backButton.el);

        this._el = pageSingleplayer;
        this.hide();
    }

    init(options = {}) {
    }

    show(options = {}) {
        super.show();

        (new Mediator()).emit(
            EVENTS.GAME.INIT,
            {
                mode: 'singleplayer',
                element: '#singleplayer',
            },
        );
    }

    hide(options = {}) {
        super.hide();
        console.log('s hide');
        (new Mediator()).emit(EVENTS.GAME.EXIT);
    }
}
