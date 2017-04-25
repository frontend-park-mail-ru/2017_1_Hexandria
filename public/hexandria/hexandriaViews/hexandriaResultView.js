import View from '../../views/view';
import Button from '../../components/button/button';
import Mediator from '../../modules/mediator';
import { EVENTS } from '../../hexandria/events';

export default class HexandriaResultView extends View {
    constructor(options = {}) {
        super(options);
        this.init({
            attrs: {
                class: 'view-result',
            },
        });

        const finishButton = new Button({
            text: 'finish',
            attrs: {
                class: 'button',
            },
            events: {
                click: (event) => {
                    (new Mediator()).emit(EVENTS.GAME.FINISH);
                },
            },
        });

        this._el.appendChild(finishButton.el);

        this.gameEl = document.getElementById('game');
        this.gameEl.appendChild(this._el);

        this.hide();
    }
}
