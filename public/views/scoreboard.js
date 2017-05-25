import View from './view';
import Title from '../components/title/title';

export default class ScoreboardView extends View {
    constructor(options = {}) {
        super(options);

        const pageScoreboard = document.getElementById('scoreboard');

        const title = new Title({
            text: 'Scoreboard',
            backButton: true,
        });
        pageScoreboard.appendChild(title.el);

        this._el = pageScoreboard;
        this.hide();
    }
}
