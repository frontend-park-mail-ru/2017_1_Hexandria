export default class Input {
    /**
     * Input constructor
     * @param {Object[]} attrs
     */
    constructor(attrs) {
        this.attrs = attrs || [];
        this.el = document.createElement('input');
    }

    /**
     * Set button attributes
     * @param attrs
     */
    setAttrs (attrs) {
        Object.keys(attrs).forEach((name) => {
            this.el.setAttribute(name, attrs[name]);
        });
    }

    /**
     * DOM update and button object return
     * @returns {Input}
     */
    render() {
        this.el.innerHTML = this.text;
        this.setAttrs(this.attrs);
        return this;
    }

    /**
     * Return button HTML string
     * @returns {string}
     */
    toString() {
        return this.el.outerHTML;
    }

    /**
     * Add event listener
     * @param {event} type
     * @param {function} callback
     */
    on (type, callback) {
        this.el.addEventListener(type, callback);
    }

    /**
     * Color input
     * @param {HTMLElement} input
     * @param color
     */
    colorInputBorder(input, color) { //TODO wtf? delete!
        this.el.style.border = `1px solid ${color}`;
    }
}
