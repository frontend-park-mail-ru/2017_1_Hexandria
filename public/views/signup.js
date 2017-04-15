'use strict';

import View from '../modules/view';
import Router from '../modules/router';
import Button from '../components/button/button';
import Form from '../components/form/form';
import Fetcher from '../modules/fetcher';
import { api } from '../hexandria/api';

export default class SignupView extends View {
    constructor(options = {}) {
        super(options);

        this.fetcher = new Fetcher();

        const pageSignup = document.getElementById('signup');

        const backButtonData = {
            text: 'Back',
            attrs: {
                class: 'back-button',
            },
            events: {
                click: (event) => { (new Router()).go('/'); },
            },
        };
        pageSignup.appendChild(new Button(backButtonData).el);

        const signupForm = new Form({
            el: document.createElement('form'),
            data: {
                controls: [
                    {
                        text: 'Signup',
                    },
                ],
                inputs: [
                    {
                        name: 'login',
                        type: 'text',
                        placeholder: 'Enter login',
                    },
                    {
                        name: 'email',
                        type: 'text',
                        placeholder: 'Enter e-mail',
                    },
                    {
                        name: 'password',
                        type: 'password',
                        placeholder: 'Enter password',
                    },
                    {
                        name: 'double_password',
                        type: 'password',
                        placeholder: 'Enter password second time',
                    },
                ],
            },
            events: {
                submit: (event) => {
                    event.preventDefault();
                    console.log('button_signup click');

                    const parent = signupForm.el;
                    const user = {
                        login: parent.login.value,
                        email: parent.email.value,
                        password: parent.password.value,
                    };

                    this.fetcher.post(api.path.signup, user)
                        .then((res) => {
                            console.log(res.status);
                            if (res.status === api.code.OK) {
                                // (new Router()).setUser(user.login);
                                (new Router()).go('/');
                                return { description: 'signup success!' };
                            }
                            return res.json();
                        })
                        .then((json) => {
                            console.log(json.description);
                        });
                },
            },
        });
        pageSignup.appendChild(signupForm.el);


        this._el = pageSignup;
        this.hide();
    }

    init(options = {}) {
    }
}
