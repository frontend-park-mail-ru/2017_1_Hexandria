(function() {
    "use strict";

    class Game {
        constructor({ el }) {
            this.el = el;
            this.render();
        }

        render() {
            this.updateHtml();
        }

        updateHtml() {
            this.el.setAttribute("class", "game-container");
        }
    }

    window.Game = Game;
})();
