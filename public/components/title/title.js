'use strict';

import './title.scss';

export default class Title {
    /**
     * Title constructor
     * @param {string} title
     * @param {HTMLElement} el
     */
    constructor({ title, el }) {
        this.title = title;
        this.el = el;
        this.render();
    }

    /**
     * Update DOM
     */
    render() {
        this.updateHtml();
    }

    /**
     * HTML update
     */
    updateHtml() {
        this.el.setAttribute('class', 'title');
        this.el.innerHTML = this.title;
    }
}
