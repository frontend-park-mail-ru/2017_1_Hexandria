import './game.scss';
import template from "./game_template.pug";
    "use strict";

    export default class Game {
        /**
         * Game constructor
         */
        constructor() {
            // this.el = el;
            this.el = document.createElement("div");
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