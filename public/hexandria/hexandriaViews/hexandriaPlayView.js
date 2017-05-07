import View from '../../views/view';
import Title from '../../components/title/title';
import Component from '../../components/component';

export default class HexandriaPlayView extends View {
    constructor(options = {}) {
        super(options);
        this.init({
            attrs: {
                class: 'hexandria__view-play',
            },
        });

        const title = new Title({
            text: 'PlayView',
            'back-button': true,
        });
        this._el.appendChild(title.el);

        const canvasContainer = new Component({
            attrs: {
                class: 'threejs-container',
            },
        });
        this._el.appendChild(canvasContainer.el);

        this.gameEl = document.getElementById('game');
        this.gameEl.appendChild(this._el);

        this.hide();
    }
}
