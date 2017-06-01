import './scoreboard.scss';

import View from './view';
import Title from '../components/title/title';
import Component from '../components/component';

import scoreboardTemplate from './scoreboardTemplate.pug';

export default class ScoreboardView extends View {
    constructor(options = {}) {
        super(options);

        const pageScoreboard = document.getElementById('scoreboard');

        const title = new Title({
            text: 'Scoreboard',
            backButton: true,
        });
        pageScoreboard.appendChild(title.el);


        const score = new Component({
            attrs: {
                class: 'hexandria__result',
            },
        });
        this.container = new Component({
            attrs: {
                class: 'hexandria__container',
            },
            childs: {
                score,
            },
        });
        pageScoreboard.appendChild(this.container.el);

        this._el = pageScoreboard;
        this.hide();
    }

    show() {
        super.show();

        if (!this._scoreTable) {
            this._scoreTable = [
                {
                    name: 'name1',
                    score: 10,
                },
                {
                    name: 'name2',
                    score: 7,
                },
                {
                    name: 'name3',
                    score: 6,
                },
                {
                    name: 'name4',
                    score: 5,
                },
                {
                    name: 'name5',
                    score: 1,
                },
                {
                    name: 'name6',
                    score: 1,
                },
                {
                    name: 'name7',
                    score: 1,
                },
                {
                    name: 'name8',
                    score: 1,
                },
                {
                    name: 'name9',
                    score: 1,
                },
                {
                    name: 'name10',
                    score: 1,
                },
            ];
        }
        console.log('score', this._scoreTable);

        const html = scoreboardTemplate({
            users: this._scoreTable,
        });

        this.container.score.innerHTML(html);
    }
}
