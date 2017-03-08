"use strict";

var fetch = require("node-fetch");

let Fetcher = (function() {
	"use strict";

	class Fetcher {
		// this.path = path

		constructor() {
			this.host = "http://79.137.74.9:8082";

			this.options = {
				// method: "POST",
				mode: "cors",
				credentials: "include",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			};
		}

		fetch(path, method, data) {
			const options = this.options;
			const host = this.host;
			options.method = method;
			if (data) {
				options.body = JSON.stringify(data);
				// console.log(options.body);
			} else {
				options.body = null;
			}
			return fetch(host + path, options)
				.then((res) => {
					// console.log("then", res);
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


describe("API tests.", function() {

	it("GET /api/user must fail. Not authorized.", function(done) {

		fetcher.fetch("/api/user", "GET")
		.then((okJSON) => {
			fail();
			done();
		})
		.catch((errorJSON) => {
			expect(errorJSON.error).toBe(authorization_error);
			done();
		});
	});

	it("POST /api/login must be ok", function(done) {

		fetcher.fetch("/api/login", "POST", data)
		.then((okJSON) => {
			expect(okJSON.description).toBe(authorization_success);
			done();
		})
		.catch((errorJSON) => {
			fail();
			done();
		});
	});

});
