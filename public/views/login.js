import Router from '../modules/router';
import Fetcher from '../modules/fetcher';
import { API } from '../hexandria/api';

import View from './view';
import Title from '../components/title/title';
import Form from '../components/form/form';

export default class LoginView extends View {
    constructor(options = {}) {
        super(options);

        this.fetcher = new Fetcher(API.HOST);

        const pageLogin = document.getElementById('login');

        this._title = new Title({
            text: 'Login',
            backButton: true,
            backButtonCallback: () => {
                this._loginForm.clear();
            },
        });
        pageLogin.appendChild(this._title.el);


        this._loginForm = new Form({
            attrs: {
                class: 'form',
            },
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
            button: {
                text: 'Login',
                tagName: 'button',
                attrs: {
                    class: 'form__button',
                },
            },
            events: {
                submit: (event) => {
                    event.preventDefault();
                    console.log('button_login click');
                    this._loginForm.showError();

                    const parent = this._loginForm.el;
                    const user = {
                        login: parent.login.value,
                        password: parent.password.value,
                    };

                    this.fetcher.post(API.PATH.LOGIN, user)
                        .then((res) => {
                            console.log(res.status);
                            if (res.status === API.CODE.OK) {
                                (new Router()).setUser(user.login);
                                (new Router()).go('/');
                                return { description: 'login success!' };
                            }
                            return res.json();
                        })
                        .then((json) => {
                            if (json instanceof Array && json.length > 0) {
                                console.log(json[0].error);
                                this._loginForm.showError(json[0].error);
                            } else {
                                console.log('login', json);
                            }
                        })
                        .catch((err) => {
                            console.log('catch', err);
                            this._loginForm.showError(err);
                        });
                },
            },
        });
        pageLogin.appendChild(this._loginForm.el);


        this._el = pageLogin;
        this.hide();
    }

    hide() {
        super.hide();

        this._loginForm.showError();
    }
}
