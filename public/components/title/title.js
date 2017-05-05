import './title.scss';

import Router from '../../modules/router';

import Button from '../button/button';
import Component from '../component';

export default class Title extends Component {
    /**
     * Title constructor
     * @param {Object} options
     */
    constructor(options) {
        if (!options.tagName) {
            options.tagName = 'div';
        }

        if (!options.attrs) {
            options.attrs = {
                class: 'title',
            };
        }

        super(options);

        const backButton = new Button({
            text: '⬅',
            attrs: {
                class: 'title-back-button',
            },
            events: {
                click: (event) => { (new Router()).go('/'); },
            },
        });

        const t = new Component({
            text: this.text,
            tagName: 'p',
        });

        this.innerHTML(); // clear inner HTML
        this.el.appendChild(backButton.el);
        this.el.appendChild(t.el);
    }
}
