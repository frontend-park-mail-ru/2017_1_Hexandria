"use strict";

import "./game.scss";
import gameTemplate from "./gameTemplate.pug";

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
        this.el.innerHTML = gameTemplate();
    }
}
