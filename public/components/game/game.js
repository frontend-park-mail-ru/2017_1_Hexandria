;(function() {
    "use strict";

    class Game {
        /**
         * Game constructor
         * @param {HTMLElement} el
         */
        constructor({ el }) {
            this.el = el;
            this.render();
        }

        /**
         * DOM update
         */
        render() {
            this.updateHtml();
        }

        /**
         * Update HTMl
         */
        updateHtml() {
            this.el.innerHTML = game_template();
        }
    }

    window.Game = Game;
})();
