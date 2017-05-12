import './hexandria.scss';

import Mediator from '../../modules/mediator';
import { EVENTS } from '../events';

import View from '../../views/view';
import Title from '../../components/title/title';
import Component from '../../components/component';
import infoTemplate from './infoTemplate.pug';

export default class HexandriaPlayView extends View {
    constructor(options = {}) {
        super(options);
        this.init({
            attrs: {
                class: 'hexandria__view-play',
            },
        });

        this.title = new Title({
            text: 'PlayView',
            'back-button': true,
        });
        this._el.appendChild(this.title.el);


        this.canvasDiv = new Component({
            attrs: {
                class: 'threejs-container',
            },
        });
        this._el.appendChild(this.canvasDiv.el);


        this.gameEl = document.getElementById('game');
        this.gameEl.appendChild(this._el);

        this.hide();
    }

    subscribe() {
        (new Mediator()).subscribe(this, EVENTS.GAME.INFO, 'refresh');
    }

    refresh(payload = {}) {
        const html = infoTemplate({
            player1Name: payload[0].name,
            player1Towns: payload[0].towns.length,

            player2Name: payload[1].name,
            player2Towns: payload[1].towns.length,
        });

        this.title.titleDiv.innerHTML(html);
    }

}
