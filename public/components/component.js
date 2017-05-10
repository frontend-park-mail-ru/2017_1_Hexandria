export default class Component {
    /**
     * Component constructor
     * @param {Object} options
     */
    constructor(options = {}) {
        this.options = options;

        this.tagName = options.tagName || 'div';
        this.el = document.createElement(this.tagName);

        if (options.text && options.childs) {
            console.error('Component text will be deleted!');
        }
        this.text = options.text || '';
        this.childs = options.childs || {};

        this.attrs = options.attrs || {};
        this.events = options.events || {};

        this.render();
    }

    /**
     * Render component
     */
    render() {
        this.innerHTML(this.text);
        this.addChilds(this.childs);
        this.setAttrs(this.attrs);
        this.setEvents(this.events);
    }

    /**
     * Set component inner HTML
     * @param {String} html
     */
    innerHTML(html = '') {
        this.el.innerHTML = html;
    }

    /**
     * Add component childs
     * @param {Object} [childs={}]
     */
    addChilds(childs = {}) {
        for (const i in childs) {
            if (childs[i]) {
                // console.log('^ ^ ^', i, items[i]);
                if (i in this) {
                    console.error('Component addChilds collision');
                }
                this[i] = childs[i];
                this.el.appendChild(this[i].el);
            }
        }
    }

    /**
     * Add class to component HTML
     */
    addClass(className) {
        this.el.classList.add(className);
    }

    /**
     * Set component attributes
     * @param {Object} [attrs={}]
     */
    setAttrs(attrs = {}) {
        Object.keys(attrs).forEach((name) => {
            this.el.setAttribute(name, attrs[name]);
        });
    }

    /**
     * Set component events
     * @param {Object} [events={}]
     */
    setEvents(events = {}) {
        Object.keys(events).forEach((name) => {
            this.el.addEventListener(name, events[name]);
        });
    }

    /**
     * Hide component
     */
    hide() {
        this.el.hidden = true;
    }

    /**
     * Show component
     */
    show() {
        this.el.hidden = false;
    }

    /**
     * Return component HTML code
     * @returns {string}
     */
    toString() {
        return this.el.outerHTML;
    }
}
