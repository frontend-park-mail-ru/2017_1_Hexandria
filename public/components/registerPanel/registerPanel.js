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
                class: 'register_panel',
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
                class: 'register_panel__login',
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
                class: 'register_panel__signup',
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
