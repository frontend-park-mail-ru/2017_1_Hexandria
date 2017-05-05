import './button.scss';

import Component from '../component';

export default class Button extends Component {
    /**
     * Button constructor
     * @param {Object} options
     */
    constructor(options) {
        if (!options.tagName) {
            options.tagName = 'div'; // TODO div?
        }

        if (!options.attrs) {
            options.attrs = {
                class: 'button',
            };
        }

        super(options);
    }
}
