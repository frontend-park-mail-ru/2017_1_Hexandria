(function() {
	"use strict";

	class UserPanel {
		/**
		 * User panel constructor
		 * @param {HTMLElement} el
		 * @param {Object[]} data
		 */
		constructor({ el, data = [] }) {
			this.el = el;
			this.username = data.username;
			this.render();
		}

		hide() {
			this.el.style.visibility = "hidden";
		}

		show() {
			this.el.style.visibility = "visible";
		}

		/**
		 * DOM update
		 */
		render() {
			this.updateHtml();
		}

		/**
		 * Update HTML
		 */
		updateHtml() {
			this.el.setAttribute("class", "user_panel");
			this.el.innerHTML = user_panel_template({ username: this.username });
		}
	}

	window.UserPanel = UserPanel;
})();
