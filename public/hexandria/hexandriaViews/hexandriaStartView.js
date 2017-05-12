import './hexandria.scss';

import Mediator from '../../modules/mediator';
import { EVENTS } from '../../hexandria/events';

import View from '../../views/view';
import Button from '../../components/button/button';
import Title from '../../components/title/title';
import Component from '../../components/component';

export default class HexandriaStartView extends View {
    constructor(options = {}) {
        super();
        this.init({
            attrs: {
                class: 'hexandria__view-start',
            },
        });


        this.title = new Title({
            text: 'StartView',
            'back-button': true,
        });
        this._el.appendChild(this.title.el);


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
        this.container = new Component({
            attrs: {
                class: 'hexandria__container',
            },
            childs: {
                startButton,
            },
        });
        this._el.appendChild(this.container.el);


        this.gameEl = document.getElementById('game');
        this.gameEl.appendChild(this._el);

        this.hide();
    }

    refresh(payload = {}) {
        this.title.titleDiv.innerHTML(payload.mode);
    }
}
