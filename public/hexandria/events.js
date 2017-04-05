;(function() {
    "use strict";

    const EVENTS = {
        GAME: {
            INIT: "EVENTS.GAME.INIT",
            START: "EVENTS.GAME.START",
            EXIT: "EVENTS.GAME.EXIT",
        },
        LOGIC: {
            SELECT: "EVENTS.LOGIC.SELECT"
        },
        GRAPHICS: {
            HIGHLIGHT: "EVENTS.GRAPHICS.HIGHLIGHT",
            MOVE: "EVENTS.GRAPHICS.MOVE",
        },
        TURN: {
            START_TURN: "EVENTS.TURN.START_TURN",
        },
        KEYBOARD: {
            ENTER_PRESSED: "EVENTS.KEYBOARD.ENTER_PRESSED",
        },
    };

    window.EVENTS = EVENTS;
})();
