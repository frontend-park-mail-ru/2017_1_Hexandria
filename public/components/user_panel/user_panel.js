import Button from '../button/button';
import Fetcher from '../../modules/fetcher';
import Router from '../../modules/router';
import { api } from '../../hexandria/api';
import './user_panel.scss';
import userPanelTemplate from './userPanelTemplate.pug';

export default class UserPanel {
    /**
     * User panel constructor
     */
    constructor() {
        this.setUser('Dolan');


        this.fetcher = new Fetcher();

        this.el = document.createElement('div');
        this._render();
        this.hide();
    }
    hide() {
        this.el.style.visibility = 'hidden';
    }

    show() {
        this.el.style.visibility = 'visible';
    }

    /**
     * DOM update
     */
    _render() {
        this.updateHtml();
        this.installControls();
    }

    /**
     * Update HTML
     */
    updateHtml() {
        this.el.setAttribute('class', 'user_panel');
        this.el.innerHTML = userPanelTemplate({ username: this.username });
    }

    /**
     * Install register panel buttons
     */
    installControls() {
        this.logout = new Button({
            text: 'Logout',
            attrs: {
                class: 'register_panel__login',
            },
            events: {
                click: (event) => {
                    console.log('post logout');
                    this.fetcher.post(api.path.logout)
                        .then((res) => {
                            (new Router()).setUser(null);
                            (new Router()).update('/');
                        });
                },
            },
        });

        this.el.appendChild(this.logout.el);
    }

    /**
     * Set user name
     * @param name
     */
    setUser(name) {
        console.log(name);
        this.username = name;
    }
}
