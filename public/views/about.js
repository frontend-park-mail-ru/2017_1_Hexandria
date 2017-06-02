import './about.scss';

import View from './view';
import Title from '../components/title/title';
import Component from '../components/component';

import aboutTemplate from './aboutTemplate.pug';

export default class AboutView extends View {
    constructor(options = {}) {
        super(options);

        const pageAbout = document.getElementById('about');

        const title = new Title({
            text: 'About',
            backButton: true,
            shadowButton: true,
        });
        pageAbout.appendChild(title.el);

        const about = new Component({
            attrs: {
                class: 'hexandria__result',
            },
            text: aboutTemplate(),
        });
        this.container = new Component({
            attrs: {
                class: 'hexandria__container',
            },
            childs: {
                about,
            },
        });
        pageAbout.appendChild(this.container.el);

        this._el = pageAbout;
        this.hide();
    }
}
