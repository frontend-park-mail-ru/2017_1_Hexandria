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

        const registerPanel = new RegisterPanel({
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
        const userPanel = new UserPanel({
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
        const panel = new Component({
            attrs: {
                class: `${mainClass}__panel`,
            },
            childs: {
                registerPanel,
                userPanel,
            },
        });


        const title = new Component({
            text: 'hexandria',
            attrs: {
                class: `${mainClass}__title`,
            },
        });
        const motto = new Component({
            text: 'You are the ruler',
            attrs: {
                class: `${mainClass}__motto`,
            },
        });


        const singleplayer = new Button({
            text: 'Singleplayer',
            attrs: {
                class: `${mainClass}__singleplayer`,
            },
            events: {
                click: () => { (new Router()).go('/singleplayer'); },
            },
        });
        const multiplayer = new Button({
            text: 'Multiplayer',
            attrs: {
                class: `${mainClass}__multiplayer`,
            },
            events: {
                click: () => { (new Router()).go('/multiplayer'); },
            },
        });
        const buttonsMain = new Component({
            attrs: {
                class: `${mainClass}__buttons__main`,
            },
            childs: {
                singleplayer,
                multiplayer,
            },
        });


        const about = new Button({
            text: 'About',
            attrs: {
                class: `${mainClass}__about`,
            },
            events: {
                click: () => { (new Router()).go('/about'); },
            },
        });
        const scoreboard = new Button({
            text: 'Scoreboard',
            attrs: {
                class: `${mainClass}__scoreboard`,
            },
            events: {
                click: () => { (new Router()).go('/scoreboard'); },
            },
        });
        const buttonsMinor = new Component({
            attrs: {
                class: `${mainClass}__buttons__minor`,
            },
            childs: {
                about,
                scoreboard,
            },
        });

        const buttons = new Component({
            attrs: {
                class: `${mainClass}__buttons`,
            },
            childs: {
                buttonsMain,
                buttonsMinor,
            },
        });


        this.hex = new Component({
            attrs: {
                class: mainClass,
            },
            childs: {
                panel,
                title,
                motto,
                buttons,
            },
        });
        pageIndex.appendChild(this.hex.el);


        this.fetcher = new Fetcher(API.HOST);
        this.fetcher.get(API.PATH.USER)
            .then((res) => {
                if (res.status === API.CODE.OK) {
                    return res.json();
                }
                throw API.AUTH.ERROR;
            })
            .then((json) => {
                console.log(json);
                (new Router()).setUser(json.login);
                this.update();
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
            this.hex.panel.userPanel.updateUser(this.user);

            this.hex.panel.userPanel.show();
            this.hex.panel.registerPanel.hide();
        } else {
            this.hex.panel.userPanel.hide();
            this.hex.panel.registerPanel.show();
        }
    }

}
