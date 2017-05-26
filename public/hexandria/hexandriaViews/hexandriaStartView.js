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
            backButton: true,
        });
        this._el.appendChild(this.title.el);


        const waitInfo = new Component({
            tagName: 'p',
            text: 'Waiting for opponet...',
        });
        this.container = new Component({
            attrs: {
                class: 'hexandria__container',
            },
            childs: {
                waitInfo,
            },
        });
        this._el.appendChild(this.container.el);


        this.gameEl = document.getElementById('game');
        this.gameEl.appendChild(this._el);

        this.hide();
    }

    refresh(mode) {
        this.title.titleDiv.innerHTML(mode);
    }
}
