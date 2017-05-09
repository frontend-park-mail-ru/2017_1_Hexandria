import Router from '../modules/router';
import Fetcher from '../modules/fetcher';
import { API } from '../hexandria/api';

import View from './view';
import Title from '../components/title/title';
import Form from '../components/form/form';
import Component from '../components/component';

export default class LoginView extends View {
    constructor(options = {}) {
        super(options);

        this.fetcher = new Fetcher(API.HOST);

        const pageLogin = document.getElementById('login');

        this._title = new Title({
            text: 'Login',
            'back-button': true,
        });
        pageLogin.appendChild(this._title.el);


        this._errorComponent = new Component({
            attrs: {
                class: 'error',
            },
        });
        pageLogin.appendChild(this._errorComponent.el);


        this._loginForm = new Form({
            el: document.createElement('form'),
            data: {
                controls: [
                    {
                        text: 'Login',
                        tagName: 'button',
                        attrs: {
                            class: 'form__button',
                        },
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
                    this.showError();

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
                                this.showError(json[0].error);
                            } else {
                                console.log('login', json);
                            }
                        })
                        .catch((err) => {
                            console.log('catch', err);
                        });
                },
            },
        });
        pageLogin.appendChild(this._loginForm.el);


        this._el = pageLogin;
        this.hide();
    }

    showError(err = '') {
        this._errorComponent.innerHTML(err);
    }

    hide() {
        super.hide();

        this.showError();
    }
}
