;(function () {
    "use strict";


    const api = {};

    api.testUser = {
        login: "test-user",
        password: "test-password",
    };

    api.code = {
        OK: 200,
        BAD_REQUEST: 400,
        FORBIDDEN: 403,
    };

    api.auth = {
        successCode: 200,
        errorCode: 403,

        login: "Successfully authorized user test-user",
        logout: "User successfully logged out",
        error: "User not authorized in this session!",
        already: "User already authorized in this session",

        signup: "Successfully registered user",
    };

    api.path = {
        user: "/api/user",
        login: "/api/login",
        logout: "/api/logout",
        signup: "/api/signup",
    };

    window.api = api;
})();
