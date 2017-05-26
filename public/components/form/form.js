import './form.scss';

import Button from '../button/button';
import Validator from './validator';
import Input from '../input/input';
import Component from '../component';
import ErrorMessage from '../errorMessage/errorMessage';
import DOMUtils from '../domUtils';

export default class Form extends Component {
    /**
     * Form constructor
     * @param {Object} options
     */
    constructor(options) {
        if (!options.tagName) {
            options.tagName = 'form';
        }

        super(options);


        this._errorMessage = new ErrorMessage();
        DOMUtils.insertBefore(this._button.el, this._errorMessage.el);
    }

    innerHTML(html = '') {
        super.innerHTML(); // clear

        const validator = new Validator();

        this._inputs = [];

        const inputs = this.options.inputs || [];
        inputs.forEach((attrs) => {
            if (!attrs.class) {
                attrs.class = 'form__input';
            }

            const input = new Input({
                attrs,
                events: {
                    blur: () => {
                        try {
                            validator.validate(input.el);
                        } catch (err) {
                            console.log(err.message);
                            input.showError(err.message);
                            return;
                        }
                        input.showError();
                    },
                    focus: () => {
                        input.showError();
                    },
                },
            });
            this.el.appendChild(input.el);
            input.install();

            this._inputs.push(input);
        });


        const buttonOptions = this.options.button;
        if (!buttonOptions) {
            console.error('Button options empty');
        }
        this._button = new Button(buttonOptions);
        this.el.appendChild(this._button.el);
    }

    showError(err) {
        this._errorMessage.showError(err);
    }

    clear() {
        console.log(this._inputs);
        this._inputs.forEach(function(input) {
            input.clear();
        });
    }
}
