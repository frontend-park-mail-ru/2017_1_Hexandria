import './errorMessage.scss';

import Component from '../component';

export default class ErrorMessage extends Component {
    /**
     * ErrorMessage constructor
     * @param {Object} options
     */
    constructor(options = {}) {
        if (!options.attrs) {
            options.attrs = {
                class: 'errorMessage',
            };
        }

        super(options);
    }

    showError(err = '') {
        this.innerHTML(err);
    }
}
