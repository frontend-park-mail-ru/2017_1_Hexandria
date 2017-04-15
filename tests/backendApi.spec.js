"use strict";

import Fetcher from "../public/modules/fetcher";
import { api } from "../public/hexandria/api";

const fetcher = new Fetcher();

const timeout = 500;

describe("backendAPI", function() {

    xdescribe("Login", function() {

        it("GET /api/user must fail. Not authorized.", function(done) {
            fetcher.get(api.path.user)
                .then((res) => {
                    expect(res.status).toBe(api.code.FORBIDDEN);
                    return res.json();
                })
                .then((json) => {
                    expect(json.error).toBe(api.auth.error);
                    done();
                })
                .catch((err) => {
                    expect(err).toBeUndefined();
                    done();
                });
        }, timeout);

        it("POST /api/login must be ok", function(done) {
            fetcher.post(api.path.login, api.testUser)
                .then((res) => {
                    expect(res.status).toBe(api.code.OK);
                    return res.json();
                })
                .then((json) => {
                    expect(json.description).toBe(api.auth.login);
                    done();
                })
                .catch((err) => {
                    expect(err).toBeUndefined();
                    done();
                });
        }, timeout);

        it("GET /api/user must be ok.", function(done) {
            fetcher.get(api.path.user)
                .then((res) => {
                    expect(res.status).toBe(api.code.OK);
                    return res.json();
                })
                .then((json) => {
                    console.log(json);
                    expect(json.login).toBe(api.testUser.login);
                    expect(json.email).toBe(api.testUser.email);
                    done();
                })
                .catch((err) => {
                    expect(err).toBeUndefined();
                    done();
                });
        }, timeout);

        it("POST /api/login must fail", function(done) {
            fetcher.post(api.path.login, api.testUser)
                .then((res) => {
                    expect(res.status).toBe(api.code.FORBIDDEN);
                    return res.json();
                })
                .then((json) => {
                    expect(json.error).toBe(api.auth.already);
                    done();
                })
                .catch((err) => {
                    expect(err).toBeUndefined();
                    done();
                });
        }, timeout);

        it("POST /api/logout must be ok", function(done) {
            fetcher.post(api.path.logout)
                .then((res) => {
                    expect(res.status).toBe(api.code.OK);
                    return res.json();
                })
                .then((json) => {
                    expect(json.description).toBe(api.auth.logout);
                    done();
                })
                .catch((err) => {
                    expect(err).toBeUndefined();
                    done();
                });
        }, timeout);

        it("GET /api/user must fail. Not authorized.", function(done) {
            fetcher.get(api.path.user)
                .then((res) => {
                    expect(res.status).toBe(api.code.FORBIDDEN);
                    return res.json();
                })
                .then((json) => {
                    expect(json.error).toBe(api.auth.error);
                    done();
                })
                .catch((err) => {
                    expect(err).toBeUndefined();
                    done();
                });
        }, timeout);
    });

    xdescribe("Signup", function() {

        beforeEach(function () {
            const userNumber = Math.floor(Math.random() * 1000);
            this.testUser = {
                login: "test-user-" + userNumber,
                password: "test-password-" + userNumber,
            };
            console.log(this.testUser);
        });

        it("POST /api/signup new user: must fail. No email.", function(done) {
            fetcher.post(api.path.signup, this.testUser)
                .then((res) => {
                    expect(res.status).toBe(api.code.BAD_REQUEST);
                    return res.json();
                })
                .then((json) => {
                    console.log(json.description);
                    //expect(json.description).toBe(api.auth.logout);
                    done();
                })
                .catch((err) => {
                    expect(err).toBeUndefined();
                    done();
                });
        }, timeout);

        it("POST /api/signup new user: must be ok.", function(done) {
            this.testUser.email = this.testUser.login + "@mail.ru";
            fetcher.post(api.path.signup, this.testUser)
                .then((res) => {
                    console.log(res.status);
                    expect(res.status).toBe(api.code.OK);
                    return res.json();
                })
                .then((json) => {
                    console.log(json.description);
                    // expect(json.description).toBe(api.auth.signup);
                    done();
                })
                .catch((err) => {
                    expect(err).toBeUndefined();
                    done();
                });
        }, timeout);
    });
});
