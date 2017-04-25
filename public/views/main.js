import View from './view';
import Router from '../modules/router';
import Fetcher from '../modules/fetcher';
import { api } from '../hexandria/api';
import Hex from '../components/hex/hex';
import UserPanel from '../components/user_panel/user_panel';
import RegisterPanel from '../components/register_panel/register_panel';

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
                        colors: {
                            backColor: '#211A1D',
                            mainColor: '#F02D3A',
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
                        colors: {
                            backColor: '#211A1D',
                            mainColor: '#F02D3A',
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
                        colors: {
                            backColor: '#211A1D',
                            mainColor: '#F8F0FB',
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
                        colors: {
                            backColor: '#211A1D',
                            mainColor: '#F8F0FB',
                        },
                    },
                },
            },
        });
        pageIndex.appendChild(this.hex.el);

        this.update();

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
        if (this.user !== user) {
            if (user) {
                this.hex.userPanel.setUser(user);
                this.hex.userPanel._render();
                this.hex.userPanel.show();
                this.hex.registerPanel.hide();
            } else {
                this.hex.userPanel.hide();
                this.hex.registerPanel.show();
            }
            this.user = user;
        }
    }

}
