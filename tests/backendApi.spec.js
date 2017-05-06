'use strict';

import Fetcher from '../public/modules/fetcher';
import { API } from '../public/hexandria/api';

const fetcher = new Fetcher(API.HOST);

const timeout = 500;

xdescribe('backendAPI', function() {
    xdescribe('Login', function() {
        it(`GET ${API.PATH.USER} must fail. Not authorized.`, function(done) {
            fetcher.get(API.PATH.USER)
                .then((res) => {
                    expect(res.status).toBe(API.CODE.FORBIDDEN);
                    return res.json();
                })
                .then((json) => {
                    expect(json.error).toBe(API.AUTH.ERROR);
                    done();
                })
                .catch((err) => {
                    expect(err).toBeUndefined();
                    done();
                });
        }, timeout);

        it(`POST ${API.AUTH.LOGIN} must be ok.`, function(done) {
            fetcher.post(API.AUTH.LOGIN, API.testUser)
                .then((res) => {
                    expect(res.status).toBe(API.CODE.OK);
                    return res.json();
                })
                .then((json) => {
                    expect(json.description).toBe(API.AUTH.login);
                    done();
                })
                .catch((err) => {
                    expect(err).toBeUndefined();
                    done();
                });
        }, timeout);

        it(`GET ${API.PATH.USER} must be ok.`, function(done) {
            fetcher.get(API.PATH.USER)
                .then((res) => {
                    expect(res.status).toBe(API.CODE.OK);
                    return res.json();
                })
                .then((json) => {
                    console.log(json);
                    expect(json.login).toBe(API.testUser.login);
                    expect(json.email).toBe(API.testUser.email);
                    done();
                })
                .catch((err) => {
                    expect(err).toBeUndefined();
                    done();
                });
        }, timeout);

        it(`POST ${API.AUTH.LOGIN} must fail.`, function(done) {
            fetcher.post(API.AUTH.LOGIN, API.testUser)
                .then((res) => {
                    expect(res.status).toBe(API.CODE.FORBIDDEN);
                    return res.json();
                })
                .then((json) => {
                    expect(json.error).toBe(API.AUTH.already);
                    done();
                })
                .catch((err) => {
                    expect(err).toBeUndefined();
                    done();
                });
        }, timeout);

        it(`POST ${API.PATH.LOGOUT} must be ok.`, function(done) {
            fetcher.post(API.PATH.LOGOUT)
                .then((res) => {
                    expect(res.status).toBe(API.CODE.OK);
                    return res.json();
                })
                .then((json) => {
                    expect(json.description).toBe(API.AUTH.LOGOUT);
                    done();
                })
                .catch((err) => {
                    expect(err).toBeUndefined();
                    done();
                });
        }, timeout);

        it(`GET ${API.PATH.USER} must fail. Not authorized.`, function(done) {
            fetcher.get(API.PATH.USER)
                .then((res) => {
                    expect(res.status).toBe(API.CODE.FORBIDDEN);
                    return res.json();
                })
                .then((json) => {
                    expect(json.error).toBe(API.AUTH.ERROR);
                    done();
                })
                .catch((err) => {
                    expect(err).toBeUndefined();
                    done();
                });
        }, timeout);
    });

    describe('Signup', function() {
        beforeEach(function () {
            // const userNumber = Math.floor(Math.random() * 1000);
            const userNumber = 1;
            this.testUser = {
                login: `test-user-${userNumber}`,
                password: `test-password-${userNumber}`,
            };
            console.log(this.testUser);
        });

        it(`POST ${API.PATH.SIGNUP} ${this.testUser} must fail. No email.`, function(done) {
            fetcher.post(API.PATH.SIGNUP, this.testUser)
                .then((res) => {
                    expect(res.status).toBe(API.CODE.BAD_REQUEST);
                    return res.json();
                })
                .then((json) => {
                    console.log('signup', json);
                    // expect(json.description).toBe(API.AUTH.LOGOUT);
                    done();
                })
                .catch((err) => {
                    expect(err).toBeUndefined();
                    done();
                });
        }, timeout);

        it(`POST ${API.PATH.SIGNUP} ${this.testUser} must be ok.`, function(done) {
            this.testUser.email = `${this.testUser.login}@mail.ru`;
            fetcher.post(API.PATH.SIGNUP, this.testUser)
                .then((res) => {
                    console.log(res.status);
                    expect(res.status).toBe(API.CODE.OK);
                    return res.json();
                })
                .then((json) => {
                    console.log(json);
                    // expect(json.description).toBe(API.AUTH.SIGNUP);
                    done();
                })
                .catch((err) => {
                    expect(err).toBeUndefined();
                    done();
                });
        }, timeout);

        it(`POST ${API.PATH.LOGIN} must be ok.`, function(done) {
            fetcher.post(API.PATH.LOGIN, this.testUser)
                .then((res) => {
                    expect(res.status).toBe(API.CODE.OK);
                    return res.json();
                })
                .then((json) => {
                    expect(json.description).toBe(API.AUTH.LOGIN(this.testUser.login));
                    done();
                })
                .catch((err) => {
                    expect(err).toBeUndefined();
                    done();
                });
        }, timeout);

        it(`POST ${API.PATH.DELETE} new user: must be ok.`, function(done) {
            this.testUser.email = `${this.testUser.login}@mail.ru`;
            fetcher.post(API.PATH.DELETE)
                .then((res) => {
                    console.log(res.status);
                    expect(res.status).toBe(API.CODE.OK);
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    expect(err).toBeUndefined();
                    done();
                });
        }, timeout);

        it(`POST ${API.PATH.LOGOUT} must be ok.`, function(done) {
            fetcher.post(API.PATH.LOGOUT)
                .then((res) => {
                    expect(res.status).toBe(API.CODE.OK);
                    return res.json();
                })
                .then((json) => {
                    expect(json.description).toBe(API.AUTH.LOGOUT);
                    done();
                })
                .catch((err) => {
                    expect(err).toBeUndefined();
                    done();
                });
        }, timeout);
    });
});
