import View from '../../views/view';
import Button from '../../components/button/button';
import Title from '../../components/title/title';
import Mediator from '../../modules/mediator';
import { EVENTS } from '../../hexandria/events';

export default class HexandriaResultView extends View {
    constructor(options = {}) {
        super(options);
        this.init({
            attrs: {
                class: 'hexandria__view-result',
            },
        });

        const title = new Title({
            text: 'ResultView',
        });
        this._el.appendChild(title.el);

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
        this._el.appendChild(finishButton.el);

        this.gameEl = document.getElementById('game');
        this.gameEl.appendChild(this._el);

        this.hide();
    }
}
