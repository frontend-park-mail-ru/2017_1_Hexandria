import './hexandria.scss';

import Mediator from '../../modules/mediator';
import { EVENTS } from '../../hexandria/events';

import View from '../../views/view';
import Title from '../../components/title/title';
import Component from '../../components/component';

import startTemplate from './startTemplate.pug';

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
            shadowButton: true,
        });
        this._el.appendChild(this.title.el);


        this.container = new Component({
            attrs: {
                class: 'hexandria__container',
            },
        });
        this._el.appendChild(this.container.el);


        this.gameEl = document.getElementById('game');
        this.gameEl.appendChild(this._el);

        this.hide();
    }

    subscribe() {
        (new Mediator()).subscribe(this, EVENTS.APP.INIT, '_onAppInit');

        (new Mediator()).subscribe(this, EVENTS.UI.ONLINE, '_onUiOnline');
        (new Mediator()).subscribe(this, EVENTS.UI.OFFLINE, '_onUiOffline');
    }

    _onAppInit(payload = {}) {
        this.title.titleDiv.innerHTML(payload.mode || this.lastMode);

        if (payload.mode) {
            this.lastMode = payload.mode;
        }
    }

    _onUiOnline(data = {}) {
        this.container.innerHTML(startTemplate({ message: data.message || 'Waiting for opponent...' }));
    }

    _onUiOffline(data = {}) {
        this.container.innerHTML(startTemplate({ message: data.message || 'You are offline' }));
    }
}
