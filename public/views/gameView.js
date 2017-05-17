import View from './view';
import Mediator from '../modules/mediator';
import { EVENTS } from '../hexandria/events';

export default class GameView extends View {
    constructor(options = {}) {
        super(options);

        this.mode = 'unknown';

        this._el = document.getElementById('game');

        this.hide();
    }

    show(options = {}) {
        super.show();

        (new Mediator()).emit(
            EVENTS.APP.INIT,
            {
                mode: this.mode,
            },
        );
    }

    hide(options = {}) {
        super.hide();
        (new Mediator()).emit(EVENTS.APP.FINISH);
    }
}
