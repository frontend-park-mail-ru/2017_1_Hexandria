import View from '../modules/view';
import Button from '../components/button/button';
import Router from '../modules/router';

export default class AboutView extends View {
    constructor(options = {}) {
        super(options);

        const pageAbout = document.getElementById('about');

        const backButton = new Button({
            text: 'Back',
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
