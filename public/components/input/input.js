import './input.scss';

import Component from '../component';
import ErrorMessage from '../errorMessage/errorMessage';
import DOMUtils from '../domUtils';

export default class Input extends Component {
    /**
     * Input constructor
     * @param {Object} options
     */
    constructor(options) {
        if (!options.tagName) {
            options.tagName = 'input';
        }

        super(options);
    }

    showError(err) {
        if (err) {
            this.el.classList.add('input-error');
        } else {
            this.el.classList.remove('input-error');
        }

        this._errorMessage.showError(err);
    }

    install() {
        if (!this._installed && this.el.parentNode) {
            this._errorMessage = new ErrorMessage();
            DOMUtils.insertAfter(this.el, this._errorMessage.el);

            this._installed = true;
        }
    }

    clear() {
        this.el.value = '';
    }
}
