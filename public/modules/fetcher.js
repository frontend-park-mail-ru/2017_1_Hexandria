export default class Fetcher {

    constructor(host) {
        this.address = `http://${host}`;

        this.options = {
            mode: 'cors',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        };
    }

    _prepare(method, path, data) {
        this.options.method = method;
        if (data) {
            this.options.body = JSON.stringify(data);
        } else {
            this.options.body = null;
        }
        return fetch(this.address + path, this.options);
    }

    get(path) {
        return this._prepare('GET', path);
    }

    post(path, data) {
        return this._prepare('POST', path, data);
    }
}
