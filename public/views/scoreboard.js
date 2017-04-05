"use strict";

import View from "../modules/view";
import Router from "../modules/router";
import Button from "../components/button/button";


export default class ScoreboardView extends View {
    constructor(options = {}) {
        super(options);

        const pageScoreboard = document.getElementById("scoreboard");

        const backButton = new Button({
            text: "Back",
            attrs: {
                class: "back-button",
            },
            events: {
                click: (event) => { (new Router()).go("/"); },
            },
        });
        pageScoreboard.appendChild(backButton.el);

        this._el = pageScoreboard;
        this.hide();
    }

    init(options = {}) {
    }
}
