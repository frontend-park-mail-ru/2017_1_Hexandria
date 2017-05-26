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
};

export default API;
