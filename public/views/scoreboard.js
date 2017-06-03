import './scoreboard.scss';

import Fetcher from '../modules/fetcher';
import { API } from '../hexandria/api';

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
            shadowButton: true,
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

        this.fetcher = new Fetcher(API.HOST);
        this.fetcher.get(API.PATH.SCOREBOARD)
            .then((res) => {
                if (res.status === API.CODE.OK) {
                    return res.json();
                }
                throw API.AUTH.ERROR;
            })
            .then((json) => {
                console.warn('score', json);
                const html = scoreboardTemplate({
                    users: json,
                });

                this.container.score.innerHTML(html);
            })
            .catch((err) => {
                console.log(err);
            });

        const html = scoreboardTemplate();

        this.container.score.innerHTML(html);
    }
}
