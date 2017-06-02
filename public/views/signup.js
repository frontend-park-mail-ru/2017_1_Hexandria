import Router from '../modules/router';
import Fetcher from '../modules/fetcher';
import { API } from '../hexandria/api';

import View from './view';
import Title from '../components/title/title';
import Form from '../components/form/form';

export default class SignupView extends View {
    constructor(options = {}) {
        super(options);

        this.fetcher = new Fetcher(API.HOST);

        const pageSignup = document.getElementById('signup');

        const title = new Title({
            text: 'Signup',
            backButton: true,
            backButtonCallback: () => {
                this._signupForm.clear();
            },
            shadowButton: true,
        });
        pageSignup.appendChild(title.el);


        this._signupForm = new Form({
            attrs: {
                class: 'form',
            },
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
            button: {
                text: 'Signup',
                tagName: 'button',
                attrs: {
                    class: 'form__button',
                },
            },
            events: {
                submit: (event) => {
                    event.preventDefault();
                    console.log('button_signup click');
                    this._signupForm.showError();

                    const parent = this._signupForm.el;
                    const user = {
                        login: parent.login.value,
                        email: parent.email.value,
                        password: parent.password.value,
                    };

                    this.fetcher.post(API.PATH.SIGNUP, user)
                        .then((res) => {
                            console.log(res.status);
                            if (res.status === API.CODE.OK) {
                                (new Router()).setUser(user.login);
                                (new Router()).go('/');
                                return { description: 'signup success!' };
                            }
                            return res.json();
                        })
                        .then((json) => {
                            console.log(json);
                            if (json instanceof Array && json.length > 0) {
                                console.log(json[0].error);
                                this._signupForm.showError(json[0].error);
                            } else {
                                console.log('signup', json);
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                            this._signupForm.showError(err);
                        });
                },
            },
        });
        pageSignup.appendChild(this._signupForm.el);


        this._el = pageSignup;
        this.hide();
    }

    hide() {
        super.hide();

        this._signupForm.showError();
    }
}
