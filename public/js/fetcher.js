(function() {
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
				console.log(options.body);
			} else {
				options.body = null;
			}
			return fetch(host + path, options)
                .then((res) => {
                    if (res.status === 200) {
                        console.log("MyRequestClass", "OK");
                        return res.json();
                    }
                    console.log("MyRequestClass", "FAIL");
                    return res.json().then((err) => {
                        throw err;
                    });
                }).catch((err) => {
                    throw err;
                });
		}
		errorCatcher(errorJSON) {
			console.log(errorJSON);
			console.log(errorJSON.error);
		}
    }

	window.Fetcher = Fetcher;
})();
