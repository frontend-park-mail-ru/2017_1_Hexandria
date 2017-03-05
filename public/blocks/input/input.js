(function() {
	"use strict";

	class Input {
		constructor(attrs) {
			this.attrs = attrs || [];
			this.el = document.createElement("input");
		}

		setAttrs (attrs) {
			Object.keys(attrs).forEach((name) => {
				this.el.setAttribute(name, attrs[name]);
			});
		}

		render() {
			this.el.innerHTML = this.text;
			this.setAttrs(this.attrs);
			return this;
		}

		toString() {
			return this.el.outerHTML;
		}

		on (type, callback) {
			this.el.addEventListener(type, callback);
		}
    }

	window.Input = Input;
})();
