import './hexandria.scss';

import Mediator from '../../modules/mediator';
import { EVENTS } from '../../hexandria/events';

import View from '../../views/view';
import Button from '../../components/button/button';
import Title from '../../components/title/title';
import Component from '../../components/component';
import resultTemplate from './resultTemplate.pug';

export default class HexandriaResultView extends View {
    constructor(options = {}) {
        super(options);
        this.init({
            attrs: {
                class: 'hexandria__view-result',
            },
        });


        this.title = new Title({
            text: 'Result',
        });
        this._el.appendChild(this.title.el);


        const result = new Component({
            attrs: {
                class: 'hexandria__result',
            },
        });
        const finishButton = new Button({
            text: 'finish',
            attrs: {
                class: 'button',
            },
            events: {
                click: () => {
                    (new Mediator()).emit(EVENTS.GAME.FINISH);
                },
            },
        });
        this.container = new Component({
            attrs: {
                class: 'hexandria__container',
            },
            childs: {
                result,
                finishButton,
            },
        });
        this._el.appendChild(this.container.el);


        this.gameEl = document.getElementById('game');
        this.gameEl.appendChild(this._el);

        this.hide();
    }

    refresh(payload = {}) {
        const html = resultTemplate(payload);

        this.container.result.innerHTML(html);
    }
}
