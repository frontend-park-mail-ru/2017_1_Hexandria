'use strict';

const Fetcher = function () {
    //this.path = path

    this.fetch = function (path, method, data) {
        options.method = method;
        if (data) {
            options.body = JSON.stringify(data);
            console.log(options.body);
        } else {
            options.body = null;
        }

        return fetch(host + path, options)
            .then(res => {
                //console.log("then", res);
                if (res.status === 200) {
                    console.log("MyRequestClass", "OK");
                    return res.json();
                } else {
                    console.log("MyRequestClass", "FAIL");
                    return res.json().then(err => {throw err;});
                }
            }).catch(err => {
                //console.log("MyRequestClass catch", err);
                throw err;
            });
    };

    let _self = this;

    // const host = 'http://localhost:8082';
    const host = 'http://79.137.74.9:8082';

    let options = {
        //method: "POST",
        mode: 'cors',
        credentials: 'include',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }
};

const errorCatcher = function (errorJSON) {
    console.log(errorJSON);
    console.log(errorJSON.error);
};