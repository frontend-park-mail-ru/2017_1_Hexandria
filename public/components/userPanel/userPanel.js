import './userPanel.scss';

import userPanelTemplate from './userPanelTemplate.pug';
import Button from '../button/button';
import Component from '../component';

export default class UserPanel extends Component {
    /**
     * User panel constructor
     * @param {Object} options
     */
    constructor(options = {}) {
        if (!options.username) {
            console.warn('UserPanel constructor: username option require');
        }

        options.attrs = {
            class: 'user-panel',
        };
        super(options);

        this._username = 'guest';

        this.hide();
    }

    /**
     * Set component inner HTML
     * @param {String} html
     */
    innerHTML(html = '') {
        super.innerHTML(userPanelTemplate({ username: this.options.username }));

        this.logout = new Button({
            text: 'Logout',
            attrs: {
                class: 'user-panel__button-logout',
            },
            events: this.options.logoutEvents,
        });
        this.el.appendChild(this.logout.el);
    }

    updateUser(username) {
        this.options.username = username;
        this.innerHTML();
    }
}
