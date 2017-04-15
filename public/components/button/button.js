import './button.scss';

export default class Button {
    /**
     * Button constructor
     * @param {Object} options
     */
    constructor(options) {
        this.text = options.text;
        this.attrs = options.attrs || {};
        this.events = options.events || {};
        this.el = document.createElement('button');
        this._render();
    }

    _render() {
        this.el.innerHTML = this.text;
        this.setAttrs();
        this.setEvents();
        return this;
    }

    /**
     * Set button attributes
     */
    setAttrs() {
        Object.keys(this.attrs).forEach((name) => {
            this.el.setAttribute(name, this.attrs[name]);
        });
    }

    /**
     * Set button events
     */
    setEvents() {
        Object.keys(this.events).forEach((name) => {
            this.el.addEventListener(name, this.events[name]);
        });
    }

    /**
     * Return button HTML code
     * @returns {string}
     */
    toString() {
        return this.el.outerHTML;
    }
}
