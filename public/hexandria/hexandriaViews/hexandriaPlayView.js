import View from '../../views/view';
import Game from '../../components/game/game';

export default class HexandriaPlayView extends View {
    constructor(options = {}) {
        super(options);
        this.init({
            attrs: {
                class: 'view-play',
            },
        });

        this.game = new Game();

        this._el.appendChild(this.game.el);

        this.gameEl = document.getElementById('game');
        this.gameEl.appendChild(this._el);

        this.hide();
    }
}
