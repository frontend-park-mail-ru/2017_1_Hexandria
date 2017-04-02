;(function() {
    "use strict";

    const EVENTS = {
        GAME: {
            INIT: "EVENTS.GAME.INIT",
            START: "EVENTS.GAME.START",
            EXIT: "EVENTS.GAME.EXIT",
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
