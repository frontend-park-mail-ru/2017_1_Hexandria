export const api = {};

api.testUser = {
    login: 'test-user',
    password: 'test-password',
    email: 'test_email@test.ru',
};

api.code = {
    OK: 200,
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
};

api.auth = {
    login(login) {
        return `Successfully authorized user ${login}`;
    },
    logout: 'User successfully logged out',
    error: 'UserEntity not authorized in this session!',
    already: 'User already authorized in this session',
    signup: 'Successfully registered user',
};

api.path = {
    user: '/api/user',
    login: '/api/user/login',
    logout: '/api/user/logout',
    signup: '/api/user/signup',
    delete: '/api/user/delete',
};

export default api;
