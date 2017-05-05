import View from '../../views/view';
import Game from '../../components/game/game';

export default class HexandriaFinishView extends View {
    constructor(options = {}) {
        super(options);
        this.init({
            attrs: {
                class: 'hexandria__view-finish',
            },
        });

        this.hide();
    }
}
