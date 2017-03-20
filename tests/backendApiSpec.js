"use strict";

const fetch = require("node-fetch");

let Fetcher = (function() {

	class Fetcher {
		// this.path = path

		constructor() {
			this.host = "http://79.137.74.9:8082";

			this.options = {
				// method: "POST",
				mode: "cors",
				credentials: "include",
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json",
				},
			};
		}

		setCookie(cookie) {
			if (cookie) {
				this.options.headers.Cookie = cookie[0];
			}
		}
		dropCookie() {
			options.headers.Cookie = null;
		}

		fetch(path, method, data) {
			console.log();
			console.log();

			console.log("arguments:", arguments);
			const options = this.options;
			const host = this.host;
			options.method = method;
			if (data) {
				options.body = JSON.stringify(data);
				// console.log(options.body);
			} else {
				options.body = null;
			}
			if (arguments.length >= 4) {
				options.headers.Cookie = arguments[3][0];
				//console.log("options.cookies", options.cookies);
			}
			console.log("opt:", options.headers);

			return fetch(host + path, options)
				.then((res) => {
					if (res.status === 200) {
						//console.log("MyRequestClass", "OK");
						return res.json();
					}
					//console.log("MyRequestClass", "FAIL");
					return res.json().then((err) => {
						throw err;
					});
				})
				.catch((err) => {
					// console.log("MyRequestClass catch", err);
					throw err;
				});
		}
		fetch2(path, method, data){
			const options = this.options;
			const host = this.host;
			options.method = method;
			if (data) {
				options.body = JSON.stringify(data);
				// console.log(options.body);
			} else {
				options.body = null;
			}
			if (arguments.length >= 4) {
				options.headers.Cookie = arguments[3][0];
				// console.log("options.cookies", options.cookies);
			}

			return fetch(host + path, options)
		}
		errorCatcher(errorJSON) {
			console.log(errorJSON);
			console.log(errorJSON.error);
		}
	}

	return Fetcher;
})();

let fetcher = new Fetcher();


const login = "test-user";
const password = "test-password";
const email = "test_email@test.ru";

const data = {
	login: login,
	password: password,
};

const authorization_success = "Successfully authorized user test-user";
const authorization_error = "User not authorized in this session!";
const authorization_already = "User already authorized in this session";


const timeout = 500;

const path_user = "/api/user";
const path_login = "/api/login";
const path_logout = "/api/logout";

describe("API tests.", function() {

	it("GET /api/user must fail. Not authorized.", function(done) {

		fetcher.fetch2(path_user, "GET")
		.then((res) => {
			expect(res.status).toBe(403);
			return res.json();
		})
		.then((json) => {
			expect(json.error).toBe(authorization_error);
			done();
		})
		.catch((err) => {
			console.log("ERROR")
			expect(err).toBeUndefined();
			done();
		});

	}, timeout);

	it("POST /api/login must be ok", function(done) {
		fetcher.fetch2(path_login, "POST", data)
		.then((res) => {
			expect(res.status).toBe(200);
			fetcher.setCookie(res.headers._headers['set-cookie']);
			return res.json();
		})
		.then((json) => {
			expect(json.description).toBe(authorization_success);
			done();
		})
		.catch((err) => {
			expect(err).toBeUndefined();
			done();
		});
	}, timeout);

	it("GET /api/user must be ok.", function(done) {
		fetcher.fetch2(path_user, "GET")
		.then((res) => {
			expect(res.status).toBe(200);
			return res.json();
		})
		.then((json) => {
			//console.log("GET /user ok:", json);
			done();
		})
		.catch((err) => {
			expect(err).toBeUndefined();
			done();
		});
	}, timeout);

	it("POST /api/login must fail", function(done) {
		fetcher.fetch2(path_login, "POST", data)
		.then((res) => {
			expect(res.status).toBe(403);
			return res.json();
		})
		.then((json) => {
			//console.log("POST /login fail:", json);
			expect(json.error).toBe(authorization_already);
			done();
		})
		.catch((err) => {
			expect(err).toBeUndefined();
			done();
		});
	}, timeout);

	it("POST /api/logout must be ok", function(done) {
		fetcher.fetch2(path_logout, "POST")
		.then((res) => {
			expect(res.status).toBe(200);
			return res.json();
		})
		.then((json) => {
			expect(json.description).toBe("User successfully logged out");
			done();
		})
		.catch((err) => {
			expect(err).toBeUndefined();
			done();
		});
	}, timeout);

	it("GET /api/user must fail. Not authorized.", function(done) {

		fetcher.fetch2(path_user, "GET")
		.then((res) => {
			expect(res.status).toBe(403);
			return res.json();
		})
		.then((json) => {
			expect(json.error).toBe(authorization_error);
			done();
		})
		.catch((err) => {
			console.log("ERROR")
			expect(err).toBeUndefined();
			done();
		});

	}, timeout);
});
