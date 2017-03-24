;(function() {
    "use strict";

    class Hex {
        /**
         * Hex constructor
         * @param {Object[]} data
         * @param {HTMLElement} el
         */
        constructor({ data = [], el }) {
            this.title = data.hex_title;
            this.phrase = data.hex_phrase;
            this.controls = data.controls;
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
            this.el.innerHTML = hex_template({
                hex_title: this.title,
                hex_phrase: this.phrase,
            });
        }

        /**
         * Hex buttons install
         */
        installControls() {
            this.singleplayer = new Button(this.controls.singleplayer).render();
            this.multiplayer = new Button(this.controls.multiplayer).render();
            this.about = new Button(this.controls.about).render();
            this.scoreboard = new Button(this.controls.scoreboard).render();
            this.el.querySelector(".hex__buttons-main").appendChild(this.singleplayer.el);
            this.el.querySelector(".hex__buttons-main").appendChild(this.multiplayer.el);
            this.el.querySelector(".hex__buttons-minor").appendChild(this.about.el);
            this.el.querySelector(".hex__buttons-minor").appendChild(this.scoreboard.el);
        }
    }

    window.Hex = Hex;
})();
