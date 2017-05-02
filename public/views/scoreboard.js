import Router from '../modules/router';

import View from './view';
import Button from '../components/button/button';
import Title from '../components/title/title';

export default class ScoreboardView extends View {
    constructor(options = {}) {
        super(options);

        const pageScoreboard = document.getElementById('scoreboard');

        const title = new Title({
            title: 'Scoreboard',
            el: document.createElement('div'),
        });
        pageScoreboard.appendChild(title.el);

        const backButton = new Button({
            text: '⬅',
            attrs: {
                class: 'back-button',
            },
            events: {
                click: (event) => { (new Router()).go('/'); },
            },
        });
        pageScoreboard.appendChild(backButton.el);

        this._el = pageScoreboard;
        this.hide();
    }

    init(options = {}) {
    }
}
