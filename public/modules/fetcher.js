export default class Fetcher {

    constructor() {
        this.host = 'http://hexandria.ru:8082';
        // this.host = 'http://localhost:8082';

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
        return fetch(this.host + path, this.options);
    }

    get(path) {
        return this._prepare('GET', path);
    }

    post(path, data) {
        return this._prepare('POST', path, data);
    }
}
