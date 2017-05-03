import Router from '../modules/router';

import View from './view';
import Button from '../components/button/button';
import Title from '../components/title/title';

export default class AboutView extends View {
    constructor(options = {}) {
        super(options);

        const pageAbout = document.getElementById('about');

        const title = new Title({
            text: 'About',
        });
        pageAbout.appendChild(title.el);

        const backButton = new Button({
            text: '⬅',
            attrs: {
                class: 'back-button',
            },
            events: {
                click: (event) => { (new Router()).go('/'); },
            },
        });
        pageAbout.appendChild(backButton.el);

        this._el = pageAbout;
        this.hide();
    }

    init(options = {}) {
    }
}
