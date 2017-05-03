import './form.scss';

import Button from '../button/button';
import Validator from './validator';
import Input from '../input/input';

export default class Form {
    /**
     * Form constructor
     * @param {Object} options
     */
    constructor(options) {
        this.data = options.data || {};
        this.events = options.events || {};
        this.el = options.el;
        this._render();
    }

    /**
     * DOM update
     */
    _render() {
        this.updateHtml();
        this.installInputs();
        this.installControls();
        this.setEvents();
    }

    /**
     * Update HTML
     */
    updateHtml() {
        this.el.classList.add('form');
    }

    /**
     * Form inputs install
     */
    installInputs() {
        const { inputs = [] } = this.data;
        const validator = new Validator();

        inputs.forEach((data) => {
            const input = new Input(data).render();
            input.el.classList.add('form__input');
            input.on('blur', () => {
                try {
                    validator.validate(input.el);
                } catch (err) {
                    console.log(err.message);
                    input.colorInputBorder(input, '#f02d3a');
                    return;
                }
                input.colorInputBorder(input, '#f8f0fb');
            });
            input.on('click', () => {
                input.colorInputBorder(this, '#9197ae');
            });
            this.el.appendChild(input.el);
        });
    }

    /**
     * Set button events
     */
    setEvents() {
        Object.keys(this.events).forEach((name) => {
            this.el.addEventListener(name, this.events[name]);
        });
    }

    /**
     * Form buttons install
     */
    installControls () {
        // const { controls = [] } = this.data;
        const controls = this.data.controls || {};

        controls.forEach((data) => {
            const control = new Button(data);
            this.el.appendChild(control.el);
        });
    }
}
