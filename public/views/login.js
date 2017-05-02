import Router from '../modules/router';
import Fetcher from '../modules/fetcher';
import { api } from '../hexandria/api';

import View from './view';
import Button from '../components/button/button';
import Title from '../components/title/title';
import Form from '../components/form/form';

export default class LoginView extends View {
    constructor(options = {}) {
        super(options);

        this.fetcher = new Fetcher();

        const pageLogin = document.getElementById('login');

        const title = new Title({
            title: 'Login',
            el: document.createElement('div'),
        });
        pageLogin.appendChild(title.el);

        const backButton = new Button({
            text: '⬅',
            attrs: {
                class: 'back-button',
            },
            events: {
                click: (event) => { (new Router()).go('/'); },
            },
        });
        pageLogin.appendChild(backButton.el);


        const loginForm = new Form({
            el: document.createElement('form'),
            data: {
                controls: [
                    {
                        text: 'Login',
                    },
                ],
                inputs: [
                    {
                        name: 'login',
                        type: 'text',
                        placeholder: 'Enter Login',
                    },
                    {
                        name: 'password',
                        type: 'password',
                        placeholder: 'Enter Password',
                    },
                ],
            },
            events: {
                submit: (event) => {
                    event.preventDefault();
                    console.log('button_login click');

                    const parent = loginForm.el;
                    const user = {
                        login: parent.login.value,
                        password: parent.password.value,
                    };

                    this.fetcher.post(api.path.login, user)
                        .then((res) => {
                            console.log(res.status);
                            if (res.status === api.code.OK) {
                                (new Router()).setUser(user.login);
                                (new Router()).go('/');
                                return { description: 'login success!' };
                            }
                            return res.json();
                        })
                        .then((json) => {
                            console.log(json);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                },
            },
        });
        pageLogin.appendChild(loginForm.el);


        this._el = pageLogin;
        this.hide();
    }

    init(options = {}) {
    }
}
