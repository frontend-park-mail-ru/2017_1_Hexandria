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

        if (options.backButton) {
            const backButton = new Button({
                text: '⬅',
                attrs: {
                    class: 'title__back-button',
                },
                events: {
                    click: () => {
                        (new Router()).go('/');

                        if (options.backButtonCallback) {
                            options.backButtonCallback();
                        }
                    },
                },
            });
            this.el.appendChild(backButton.el);
        }

        this.titleDiv = new Component({
            text: this.text,
            attrs: {
                class: 'title__main',
            },
        });

        this.el.appendChild(this.titleDiv.el);

        if (options.shadowButton === undefined) {
            options.shadowButton = new Button({
                text: '',
                attrs: {
                    class: 'title__shadow-button',
                },
            });
        }
        if (options.shadowButton) {
            this.el.appendChild(options.shadowButton.el);
        }
    }
}
