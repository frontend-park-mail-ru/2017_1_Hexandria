import './hexandria.scss';

import Mediator from '../../modules/mediator';
import { EVENTS } from '../events';

import View from '../../views/view';
import Title from '../../components/title/title';
import Button from '../../components/button/button';
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


        this.turnButton = new Button({
            text: 'Turn',
            attrs: {
                class: 'title__back-button',
            },
            events: {
                click: () => { (new Mediator()).emit(EVENTS.UI.TURN_CLICK); },
            },
        });
        this.title = new Title({
            text: 'PlayView',
            backButton: true,
            shadowButton: this.turnButton,
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
        (new Mediator()).subscribe(this, EVENTS.UI.TURN_SHOW, '_onUiTurnShow');
        (new Mediator()).subscribe(this, EVENTS.UI.TURN_HIDE, '_onUiTurnHide');

        (new Mediator()).subscribe(this, EVENTS.GAME.INFO, '_onGameInfo');
    }

    _onUiTurnShow() {
        this.turnButton.el.style.visibility = 'visible';
    }

    _onUiTurnHide() {
        this.turnButton.el.style.visibility = 'hidden';
    }

    _onGameInfo(payload = {}) {
        const html = infoTemplate({
            player1: payload[0],
            player2: payload[1],
        });

        this.title.titleDiv.innerHTML(html);
    }
}
