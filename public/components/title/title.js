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


        this.innerHTML(); // clear inner HTML

        if ('back-button' in options) {
            const backButton = new Button({
                text: '⬅',
                attrs: {
                    class: 'title__back-button',
                },
                events: {
                    click: () => { (new Router()).go('/'); },
                },
            });
            // this.el.appendChild(this._backButton.el);

            this.backDiv = new Component({
                childs: {
                    backButton,
                },
            });
            // div.el.appendChild(this._backButton.el);
            this.el.appendChild(this.backDiv.el);
        }

        this.titleDiv = new Component({
            text: this.text,
            attrs: {
                class: 'title__main',
            },
        });

        this.el.appendChild(this.titleDiv.el);
    }
}
