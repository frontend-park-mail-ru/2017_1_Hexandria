import Mediator from '../modules/mediator';

export default class Transport {
    constructor() {
        if (Transport.__instance) {
            return Transport.__instance;
        }
        Transport.__instance = this;

        const host = 'ws://hexandria.ru:8082/ws';

        this.ws = new WebSocket(host);
        this.ws.onopen = function (event) {
            console.log(`WebSocket on address ${host} opened`);

            console.dir(this.ws);

            this.ws.onmessage = this.handleMessage.bind(this);
            const interval = this.interval = setInterval(() => this.ws.send('update'), 10 * 1000);

            this.ws.onclose = function () {
                clearInterval(interval);
            };
        }.bind(this);
    }

    handleMessage(event) {
        const messageText = event.data;
        const message = JSON.parse(messageText);
        console.log('message...', message);

        // this.mediator.emit(message.type, message.payload);
        (new Mediator()).emit(message.type, message.payload);
    }

    send(type, payload) {
        const data = JSON.stringify({ type, payload });
        console.log('sending...', data);

        this.ws.send(data);
    }
}
