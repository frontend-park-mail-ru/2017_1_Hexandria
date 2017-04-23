import View from '../modules/view';
import Router from '../modules/router';
import Button from '../components/button/button';
import Game from '../components/game/game';
import Mediator from '../modules/mediator';
import { EVENTS } from '../hexandria/events';

export default class MultiplayerView extends View {
    constructor(options = {}) {
        super(options);

        const pageMultiplayer = document.getElementById('multiplayer');


        this.game = new Game();
        pageMultiplayer.appendChild(this.game.el);


        const backButton = new Button({
            text: '⬅',
            attrs: {
                class: 'back-button',
            },
            events: {
                click: (event) => { (new Router()).go('/'); },
            },
        });
        pageMultiplayer.appendChild(backButton.el);

        this._el = pageMultiplayer;
        this.hide();
    }

    init(options = {}) {
    }

    show(options = {}) {
        super.show();

        (new Mediator()).emit(
            EVENTS.GAME.INIT,
            {
                mode: 'multiplayer', // TODO multiplayer
                element: '#multiplayer',
            },
        );
    }

    hide(options = {}) {
        super.hide();
        (new Mediator()).emit(EVENTS.GAME.EXIT);
    }
}
