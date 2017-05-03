import './registerPanel.scss';

import Button from '../button/button';
import Router from '../../modules/router';

import Component from '../component';

export default class RegisterPanel extends Component {
    /**
     * Register panel constructor
     */
    constructor() {
        super({
            attrs: {
                class: 'hex__register-panel',
            },
        });

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
                class: 'hex__button-login',
            },
            events: {
                click: (event) => {
                    (new Router()).go('/login');
                },
            },
        });
        this.signup = new Button({
            text: 'Signup',
            attrs: {
                class: 'hex__button-signup',
            },
            events: {
                click: (event) => {
                    (new Router()).go('/signup');
                },
            },
        });

        this.el.appendChild(this.login.el);
        this.el.appendChild(this.signup.el);
    }
}
