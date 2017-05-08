import './registerPanel.scss';

import Button from '../button/button';
import Component from '../component';

export default class RegisterPanel extends Component {
    /**
     * Register panel constructor
     * @param {Object} options
     */
    constructor(options) {
        options.attrs = {
            class: 'register-panel',
        };
        super(options);

        this.hide();
    }

    /**
     * Set component inner HTML
     * @param {String} html
     */
    innerHTML(html = '') {
        this.login = new Button({
            text: 'Login',
            attrs: {
                class: 'register-panel__button-login',
            },
            events: this.options.loginEvents,
        });
        this.signup = new Button({
            text: 'Signup',
            attrs: {
                class: 'register-panel__button-signup',
            },
            events: this.options.signupEvents,
        });

        this.el.appendChild(this.login.el);
        this.el.appendChild(this.signup.el);
    }
}
