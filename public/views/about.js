import View from '../modules/view';
import Button from '../components/button/button';
import Title from '../components/title/title';
import Router from '../modules/router';

export default class AboutView extends View {
    constructor(options = {}) {
        super(options);

        const pageAbout = document.getElementById('about');

        const title = new Title({
            title: 'About',
            el: document.createElement('div'),
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
            colors: {
                backColor: '#211A1D',
                mainColor: '#F8F0FB',
            },
        });
        pageAbout.appendChild(backButton.el);

        this._el = pageAbout;
        this.hide();
    }

    init(options = {}) {
    }
}
