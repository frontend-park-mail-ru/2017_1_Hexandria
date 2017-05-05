import Router from '../modules/router';

import View from './view';
import Button from '../components/button/button';
import Title from '../components/title/title';

export default class ScoreboardView extends View {
    constructor(options = {}) {
        super(options);

        const pageScoreboard = document.getElementById('scoreboard');

        const title = new Title({
            text: 'Scoreboard',
        });
        pageScoreboard.appendChild(title.el);

        this._el = pageScoreboard;
        this.hide();
    }

    init(options = {}) {
    }
}
