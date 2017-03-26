;(function () {
    "use strict";

    const fetcher = new Fetcher();

    const timeout = 500;

    describe("backendAPI", function() {

        describe("Login", function() {

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

        describe("Signup", function() {
            const userNumber = Math.floor(Math.random() * 1000);
            let testUser = {
                login: "test-user-" + userNumber,
                password: "test-password-" + userNumber,
            };
            //console.log(testUser);

            xit("POST /api/signup new user: " + testUser.login + " must fail. No email.", function(done) {
                fetcher.post(api.path.signup, testUser)
                    .then((res) => {
                        console.log(res.status);
                        //expect(res.status).toBe(api.code.BAD_REQUEST);
                        return res.json();
                    })
                    .then((json) => {
                        console.log(json.description);
                        expect(json.description).toBe(api.auth.logout);
                        done();
                    })
                    .catch((err) => {
                        expect(err).toBeUndefined();
                        done();
                    });
            }, timeout);

            //testUser.email = testUser.login + "@mail.ru";
            //console.log(testUser);
            it("POST /api/signup new user: " + testUser.login + " must be ok.", function(done) {
                fetcher.post(api.path.signup, testUser)
                    .then((res) => {
                        console.log(res.status);
                        //expect(res.status).toBe(api.code.OK);
                        return res.json();
                    })
                    .then((json) => {
                        console.log(json.description);
                        expect(json.description).toBe(api.auth.signup);
                        done();
                    })
                    .catch((err) => {
                        expect(err).toBeUndefined();
                        done();
                    });
            }, timeout);

        });

    });

})();
