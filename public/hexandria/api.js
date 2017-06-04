export const API = {};

API.HOST = 'hexandria.ru';
// API.HOST = 'localhost:8082';

API.CODE = {
    OK: 200,
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
};

API.AUTH = {
    LOGIN(login) {
        return `Successfully authorized user ${login}`;
    },
    LOGOUT: 'User successfully logged out',
    ERROR: 'UserEntity not authorized in this session!',
    ALREADY: 'User already authorized in this session',
    SIGNUP: 'Successfully registered user',
};

API.PATH = {
    USER: '/api/user',
    LOGIN: '/api/user/login',
    LOGOUT: '/api/user/logout',
    SIGNUP: '/api/user/signup',
    DELETE: '/api/user/delete',
    SCOREBOARD: '/api/scoreboard',
};

API.GAME = {
    TIMEOUT: 30,

    TOWN_COUNT: 15,
    TOWN_MORALE: 10,

    CAPITAL_COUNT: 50,
    CAPITAL_MORALE: 30,
};
API.GAME.TOWN_COUNT_MAX = 3 * API.GAME.TOWN_COUNT;
API.GAME.CAPITAL_COUNT_MAX = 3 * API.GAME.CAPITAL_COUNT;

API.COLOR = {
    BACKGROUND: 0x3c3c3c,
    DEFAULT: 0x7c7c7e,
    SPECIAL: 0xb35737,
    WHITE: 0xc9cdca,

    GAME_1: 0xdb5461,
    GAME_2: 0x306bac,
};

export default API;
