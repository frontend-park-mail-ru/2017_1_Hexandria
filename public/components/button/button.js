;(function() {
    "use strict";

    class Button {
        /**
         * Button constructor
         * @param {Object} options
         */
        constructor(options) {
            this.text = options.text;
            this.attrs = options.attrs || [];
            this.el = document.createElement("button");
        }

        render() {
            this.el.innerHTML = this.text;
            this.setAttrs(this.attrs);
            return this;
        }

        /**
         * Set button attributes
         * @param {Object} attrs
         */
        setAttrs (attrs) {
            Object.keys(attrs).forEach((name) => {
                this.el.setAttribute(name, attrs[name]);
            });
        }

        /**
         * Return button HTML code
         * @returns {string}
         */
        toString() {
            return this.el.outerHTML;
        }

        /**
         * Adds event listener to button
         * @param {string} type
         * @param {function} callback
         */
        on (type, callback) {
            this.el.addEventListener(type, callback);
            return this;
        }
    }

    window.Button = Button;
})();
