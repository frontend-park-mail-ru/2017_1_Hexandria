import View from '../../views/view';
import Button from '../../components/button/button';
import Title from '../../components/title/title';
import Mediator from '../../modules/mediator';
import { EVENTS } from '../../hexandria/events';

export default class HexandriaStartView extends View {
    constructor(options = {}) {
        super();
        this.init({
            attrs: {
                class: 'hexandria__view-start',
            },
        });

        const title = new Title({
            text: 'StartView',
            'back-button': true,
        });
        this._el.appendChild(title.el);

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
        this._el.appendChild(startButton.el);

        this.gameEl = document.getElementById('game');
        this.gameEl.appendChild(this._el);

        this.hide();
    }
}
