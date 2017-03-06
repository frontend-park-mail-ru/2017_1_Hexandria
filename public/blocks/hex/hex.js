(function() {
	"use strict";

	class Hex {
		/**
		 * Hex constructor
		 * @param {Object[]} data
		 * @param {HTMLElement} el
		 */
		constructor({ data = [], el }) {
			this.data = data;
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
			this.el.innerHTML = hex_template();
		}

		/**
		 * Hex buttons install
		 */
		installControls() {
			this.singleplayer = new Button(this.data.singleplayer).render();
			this.multiplayer = new Button(this.data.multiplayer).render();
			this.about = new Button(this.data.about).render();
			this.scoreboard = new Button(this.data.scoreboard).render();
			this.el.querySelector(".hex__buttons-main").appendChild(this.singleplayer.el);
			this.el.querySelector(".hex__buttons-main").appendChild(this.multiplayer.el);
			this.el.querySelector(".hex__buttons-minor").appendChild(this.about.el);
			this.el.querySelector(".hex__buttons-minor").appendChild(this.scoreboard.el);
		}
    }

	window.Hex = Hex;
})();
