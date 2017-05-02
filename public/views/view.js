/**
 * View class
 */
export default class View {
    /**
     * Create new view
     * @param {Object} [options={}]
     */
    constructor(options = {}) {
        // if (options.createElement) {
        //     this.tagName = options.tagName || 'div';
        // } else {
        //     this.tagName = 'div';
        // }
        this.tagName = options.tagName || 'div';
        this._el = document.createElement(this.tagName);
    }

    /**
     * view initialisation (right after creation)
     * need to override!
     * @param {Object} [options={}]
     */
    init(options = {}) {
        this.setAttrs(options.attrs);
    }

    /**
     * Pause view work
     * need to override!
     * @param {Object} [options={}]
     */
    pause(options = {}) {
        this.hide();
    }

    /**
     * Resume view work
     * need to override!
     * @param {Object} [options={}]
     */
    resume(options = {}) {
        this.show();
    }

    /**
     * Update view
     */
    update() {
    }

    /**
     * Show view
     * @param {Object} [options={}]
     */
    show(options = {}) {
        this._el.hidden = false;
    }

    /**
     * Hide view
     * @param {Object} [options={}]
     */
    hide(options = {}) {
        this._el.hidden = true;
    }

    /**
     * Render view
     * need to override!
     * @param {Object} [options={}]
     */
    render(options = {}) {

    }

    /**
     * Append view in element
     * @param {HTMLElement} el
     */
    appendTo(el) {
        el.appendChild(this._el);
    }

    /**
     * Remove view
     */
    remove() {
        // this._el && this._el.remove();
        if (this._el) {
            this._el.remove();
        }
    }

    /**
     * Replace view.element to new element
     * @param {HTMLElement} el
     */
    setElement(el) {
        this.remove(); // this._el && this._el.remove();
        this._el = el;
    }

    /**
     * Set view attributes
     * @param {Object} [attrs={}]
     */
    setAttrs(attrs = {}) {
        Object.keys(attrs).forEach((name) => {
            this._el.setAttribute(name, attrs[name]);
        });
    }

    /**
     * Return view.element as string
     * @returns {string}
     */
    toString() {
        return this._el.outerHTML;
    }

    /**
     * Set view router
     * @param {Router} router - инстанс роутера
     */
    setRouter(router) {
        this.router = router;
    }

}
