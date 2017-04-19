import Button from '../button/button';
import hexTemplate from './hexTemplate.pug';
import UserPanel from '../user_panel/user_panel';
import RegisterPanel from '../register_panel/register_panel';

export default class Hex {
    /**
     * Hex constructor
     * @param {Object[]} data
     * @param {HTMLElement} el
     */
    constructor({ data = [], el }) {
        this.title = data.hex_title;
        this.phrase = data.hex_phrase;
        this.controls = data.controls;
        this.el = el;
        this.render();
    }

    /**
     * DOM update
     */
    render() {
        this.updateHtml();
        this.installControls();
    }

    /**
     * Update HTML
     */
    updateHtml() {
        this.el.innerHTML = hexTemplate({
            hex_title: this.title,
            hex_phrase: this.phrase,
        });
        this.registerPanel = new RegisterPanel();
        this.el.querySelector('.hex__panel').appendChild(this.registerPanel.el);
        this.registerPanel.el.setAttribute('class', 'hex__register_panel');
        this.userPanel = new UserPanel();
        this.userPanel.el.setAttribute('class', 'hex__user_panel');
        this.el.querySelector('.hex__panel').appendChild(this.userPanel.el);
    }

    /**
     * Hex buttons install
     */
    installControls() {
        this.singleplayer = new Button(this.controls.singleplayer);
        this.multiplayer = new Button(this.controls.multiplayer);
        this.about = new Button(this.controls.about);
        this.scoreboard = new Button(this.controls.scoreboard);

        this.el.querySelector('.hex__buttons-main').appendChild(this.singleplayer.el);
        this.el.querySelector('.hex__buttons-main').appendChild(this.multiplayer.el);
        this.el.querySelector('.hex__buttons-minor').appendChild(this.about.el);
        this.el.querySelector('.hex__buttons-minor').appendChild(this.scoreboard.el);
    }
}
