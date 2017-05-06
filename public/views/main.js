import Router from '../modules/router';
import Fetcher from '../modules/fetcher';
import { API } from '../hexandria/api';

import View from './view';
import Hex from '../components/hex/hex';

export default class MainView extends View {

    constructor(options = {}) {
        super(options);

        const pageIndex = document.getElementById('index');

        this.hex = new Hex({
            el: document.createElement('div'),
            data: {
                hex_title: 'hexandria',
                hex_phrase: 'You are the ruler',
                controls: {
                    singleplayer: {
                        text: 'Singleplayer',
                        attrs: {
                            class: 'hex__singleplayer',
                        },
                        events: {
                            click: () => { (new Router()).go('/singleplayer'); },
                        },
                    },
                    multiplayer: {
                        text: 'Multiplayer',
                        attrs: {
                            class: 'hex__multiplayer',
                        },
                        events: {
                            click: () => { (new Router()).go('/multiplayer'); },
                        },
                    },
                    about: {
                        text: 'About',
                        attrs: {
                            class: 'hex__about',
                        },
                        events: {
                            click: () => { (new Router()).go('/about'); },
                        },
                    },
                    scoreboard: {
                        text: 'Scoreboard',
                        attrs: {
                            class: 'hex__scoreboard',
                        },
                        events: {
                            click: () => { (new Router()).go('/scoreboard'); },
                        },
                    },
                },
            },
        });
        pageIndex.appendChild(this.hex.el);


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
        if (user !== 'guest' && user !== this.user) {
            this.user = user;
            this.hex.userPanel.updateUser();

            this.hex.userPanel.show();
            this.hex.registerPanel.hide();
        } else {
            this.hex.userPanel.hide();
            this.hex.registerPanel.show();
        }
    }

}
