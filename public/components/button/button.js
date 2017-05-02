export default class Button {
    /**
     * Button constructor
     * @param {Object} options
     */
    constructor(options) {
        this.text = options.text;
        this.el = document.createElement('button');
        this.attrs = options.attrs || {};
        this.events = options.events || {};
        this.colors = options.colors || {};
        this._render();
    }

    _render() {
        this.el.innerHTML = this.text;
        this.setAttrs();
        this.setEvents();
        this.colorize();
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

    colorize() {
        this.el.style.backgroundColor = this.colors.backgroundColor;
        this.el.style.borderColor = this.colors.mainColor;
    }
}
