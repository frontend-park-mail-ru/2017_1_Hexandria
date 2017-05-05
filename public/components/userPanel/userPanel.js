import './userPanel.scss';

import Fetcher from '../../modules/fetcher';
import Router from '../../modules/router';
import { api } from '../../hexandria/api';

import userPanelTemplate from './userPanelTemplate.pug';
import Button from '../button/button';
import Component from '../component';

export default class UserPanel extends Component {
    /**
     * User panel constructor
     */
    constructor() {
        super({
            attrs: {
                class: 'hex__user-panel',
            },
        });

        this.hide();
        this.fetcher = new Fetcher();
    }

    /**
     * Set component inner HTML
     * @param {String} html
     */
    innerHTML(html = '') {
        this.el.innerHTML = userPanelTemplate({ username: (new Router()).getUser() });

        this.logout = new Button({
            text: 'Logout',
            attrs: {
                class: 'hex__button-logout',
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

    updateUser() {
        this.innerHTML();
    }
}
