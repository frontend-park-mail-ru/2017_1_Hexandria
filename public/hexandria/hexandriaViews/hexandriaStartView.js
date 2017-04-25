import View from '../../views/view';
import Router from '../../modules/router';
import Button from '../../components/button/button';
import Mediator from '../../modules/mediator';
import { EVENTS } from '../../hexandria/events';

export default class HexandriaStartView extends View {
    constructor(options = {}) {
        super();
        this.init({
            attrs: {
                class: 'view-start',
            },
        });

        const backButton = new Button({
            text: '⬅',
            attrs: {
                class: 'back-button',
            },
            events: {
                click: (event) => { (new Router()).go('/'); },
            },
        });

        const startButton = new Button({
            text: 'start',
            attrs: {
                class: 'button',
            },
            events: {
                click: (event) => {
                    (new Mediator()).emit(EVENTS.GAME.PLAY);
                },
            },
        });

        this._el.appendChild(backButton.el);
        this._el.appendChild(startButton.el);

        this.gameEl = document.getElementById('game');
        this.gameEl.appendChild(this._el);

        this.hide();
    }
}
