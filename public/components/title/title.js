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
            // this.el.appendChild(backButton.el);

            this.backDiv = new Component({
                childs: {
                    backButton,
                },
            });
            this.el.appendChild(this.backDiv.el);
        }

        this.titleDiv = new Component({
            text: this.text,
            attrs: {
                class: 'title__main',
            },
        });

        this.el.appendChild(this.titleDiv.el);

        if ('back-button' in options) {
            const shadowButton = new Button({
                text: '',
                attrs: {
                    class: 'title__shadow-button',
                },
            });
            // this.el.appendChild(shadowButton.el);

            this.shadowDiv = new Component({
                childs: {
                    shadowButton,
                },
            });
            this.el.appendChild(this.shadowDiv.el);
        }
    }
}
