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
            this.el.innerHTML = game_template();
        }
    }

    window.Game = Game;
})();
