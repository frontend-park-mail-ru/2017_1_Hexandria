import './main.scss';

import Router from '../modules/router';
import Fetcher from '../modules/fetcher';
import { API } from '../hexandria/api';

import View from './view';

import Component from '../components/component';
import Button from '../components/button/button';
import UserPanel from '../components/userPanel/userPanel';
import RegisterPanel from '../components/registerPanel/registerPanel';

export default class MainView extends View {

    constructor(options = {}) {
        super(options);

        const pageIndex = document.getElementById('index');
        const mainClass = 'main';

        this.user = (new Router()).getUser();

        this._registerPanel = new RegisterPanel({
            loginEvents: {
                click: () => {
                    (new Router()).go('/login');
                },
            },
            signupEvents: {
                click: () => {
                    (new Router()).go('/signup');
                },
            },
        });
        this._userPanel = new UserPanel({
            username: this.user,
            logoutEvents: {
                click: () => {
                    console.log('post logout');
                    this.fetcher.post(API.PATH.LOGOUT)
                        .then(() => {
                            (new Router()).setUser(null);
                            (new Router()).update('/');
                        });
                },
            },
        });
        this._panel = new Component({
            attrs: {
                class: `${mainClass}__panel`,
            },
            childs: [
                this._registerPanel,
                this._userPanel,
            ],
        });


        this._title = new Component({
            text: 'hexandria',
            attrs: {
                class: `${mainClass}__title`,
            },
        });
        this._motto = new Component({
            text: 'You are the ruler',
            attrs: {
                class: `${mainClass}__motto`,
            },
        });


        this._singleplayer = new Button({
            text: 'Singleplayer',
            attrs: {
                class: `${mainClass}__singleplayer`,
            },
            events: {
                click: () => { (new Router()).go('/singleplayer'); },
            },
        });
        this._multiplayer = new Button({
            text: 'Multiplayer',
            attrs: {
                class: `${mainClass}__multiplayer`,
            },
            events: {
                click: () => { (new Router()).go('/multiplayer'); },
            },
        });
        this._buttonsMain = new Component({
            attrs: {
                class: `${mainClass}__buttons-main`,
            },
            childs: [
                this._singleplayer,
                this._multiplayer,
            ],
        });


        this._about = new Button({
            text: 'About',
            attrs: {
                class: `${mainClass}__about`,
            },
            events: {
                click: () => { (new Router()).go('/about'); },
            },
        });
        this._scoreboard = new Button({
            text: 'Scoreboard',
            attrs: {
                class: `${mainClass}__scoreboard`,
            },
            events: {
                click: () => { (new Router()).go('/scoreboard'); },
            },
        });
        this._buttonsMinor = new Component({
            attrs: {
                class: `${mainClass}__buttons-minor`,
            },
            childs: [
                this._about,
                this._scoreboard,
            ],
        });


        this._buttons = new Component({
            attrs: {
                class: `${mainClass}__buttons`,
            },
            childs: [
                this._buttonsMain,
                this._buttonsMinor,
            ],
        });


        this._hex = new Component({
            attrs: {
                class: mainClass,
            },
            childs: [
                this._panel,
                this._title,
                this._motto,
                this._buttons,
            ],
        });
        pageIndex.appendChild(this._hex.el);


        this.fetcher = new Fetcher(API.HOST);
        this.fetcher.get(API.PATH.USER)
            .then((res) => {
                if (res.status === API.CODE.OK) {
                    console.log('ok');
                    return res.json();
                }
                throw API.AUTH.ERROR;
            })
            .then((json) => {
                console.log(json);
                // this.login = json.login;
                (new Router()).setUser(json.login);
                this.show();
            })
            .catch((err) => {
                console.log(err);
            });


        this._el = pageIndex;
        this.hide();

        this.update();
    }

    show(options = {}) {
        super.show();

        this.update();
    }

    update() {
        super.update();

        const user = (new Router()).getUser();
        if (user && user !== 'guest') {
            this.user = user;
            this._userPanel.updateUser(this.user);

            this._userPanel.show();
            this._registerPanel.hide();
        } else {
            this._userPanel.hide();
            this._registerPanel.show();
        }
    }

}
