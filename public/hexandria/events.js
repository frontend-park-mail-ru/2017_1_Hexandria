export const EVENTS = {
    APP: {
        INIT: 'EVENTS.APP.INIT',
        FINISH: 'EVENTS.APP.FINISH',
    },
    SERVICE: {
        CONNECT: 'EVENTS.SERVICE.CONNECT',
        PING: 'EVENTS.SERVICE.PING',
    },
    GAME: {
        START: 'EVENTS.GAME.START',
        PLAY: 'EVENTS.GAME.PLAY',
        INFO: 'EVENTS.GAME.INFO',
        RESULT: 'EVENTS.GAME.RESULT',
    },
    LOGIC: {
        SELECT: 'EVENTS.LOGIC.SELECT',
        MOVE: 'EVENTS.LOGIC.MOVE',
        // CREATE: 'EVENTS.LOGIC.CREATE',
        UPDATE: 'EVENTS.LOGIC.UPDATE',
        DELETE: 'EVENTS.LOGIC.DELETE',
        ATTACK_CAPITAL: 'EVENTS.LOGIC.ATTACK_CAPITAL',
        ATTACK_TOWN: 'EVENTS.LOGIC.ATTACK_TOWN',
    },
    GRAPHICS: {
        SELECT_UNIT: 'EVENTS.GRAPHICS.SELECT_UNIT',
        UNSELECT_ALL: 'EVENTS.GRAPHICS.UNSELECT_ALL',
        SQUAD_MOVE: 'EVENTS.GRAPHICS.SQUAD_MOVE',
        SQUAD_UPDATE: 'EVENTS.GRAPHICS.SQUAD_UPDATE',
        SQUAD_DELETE: 'EVENTS.GRAPHICS.SQUAD_DELETE',
        TOWN_CAPTURE: 'EVENTS.GRAPHICS.TOWN_CAPTURE',
    },
    TURN: {
        START_TURN: 'EVENTS.TURN.START_TURN',
    },
    KEYBOARD: {
        ENTER_PRESSED: 'EVENTS.KEYBOARD.ENTER_PRESSED',
    },
};

export default EVENTS;
