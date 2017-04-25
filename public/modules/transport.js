import Mediator from '../modules/mediator';

export default class Transport {
    constructor() {
        if (Transport.__instance) {
            return Transport.__instance;
        }
        Transport.__instance = this;

        const host = 'ws://hexandria.ru:8082/game';
        // const host = 'ws://localhost:8082/game';

        this.ws = new WebSocket(host);
        this.ws.onopen = function (event) {
            console.log(`WebSocket on address ${host} opened`);

            console.dir(this.ws);

            this.ws.onmessage = this.handleMessage.bind(this);
            this.interval = setInterval(() => {
                console.log('ws send update');
                this.ws.send('update');
            }, 10 * 1000);

            this.ws.onclose = () => {
                console.log(`WebSocket on address ${host} closed`);
                clearInterval(this.interval);
            };
        }.bind(this);
    }

    handleMessage(event) {
        const messageText = event.data;
        const message = JSON.parse(messageText);
        console.log('message...', message);

        (new Mediator()).emit(message.type, message.payload);
    }

    send(type, payload) {
        const data = JSON.stringify({ type, payload });
        console.log('sending...', data);

        this.ws.send(data);
    }
}
