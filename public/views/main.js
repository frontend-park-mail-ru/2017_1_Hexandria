import Router from '../modules/router';
import Fetcher from '../modules/fetcher';
import { api } from '../hexandria/api';

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
                            click: (event) => { (new Router()).go('/singleplayer'); },
                        },
                    },
                    multiplayer: {
                        text: 'Multiplayer',
                        attrs: {
                            class: 'hex__multiplayer',
                        },
                        events: {
                            click: (event) => { (new Router()).go('/multiplayer'); },
                        },
                    },
                    about: {
                        text: 'About',
                        attrs: {
                            class: 'hex__about',
                        },
                        events: {
                            click: (event) => { (new Router()).go('/about'); },
                        },
                    },
                    scoreboard: {
                        text: 'Scoreboard',
                        attrs: {
                            class: 'hex__scoreboard',
                        },
                        events: {
                            click: (event) => { (new Router()).go('/scoreboard'); },
                        },
                    },
                },
            },
        });
        pageIndex.appendChild(this.hex.el);


        this.fetcher = new Fetcher();
        this.fetcher.get(api.path.user)
            .then((res) => {
                if (res.status === api.code.OK) {
                    console.log('ok');
                    return res.json();
                }
                throw api.auth.error;
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

    init(options = {}) {
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
