import Mediator from './mediator';
import Router from './router';
import { EVENTS } from '../hexandria/events';

export default class Transport {
    constructor() {
        if (Transport.__instance) {
            return Transport.__instance;
        }
        Transport.__instance = this;

        const host = 'ws://hexandria.ru:8082/game';
        // const host = 'ws://localhost:8082/game';

        this.ws = new WebSocket(host);
        this.ws.onopen = (event) => {
            console.log(`WebSocket open on address ${host}`);

            console.dir(this.ws);

            this.send(EVENTS.SERVICE.CONNECT, this.getUser());

            this.ws.onmessage = this.handleMessage.bind(this);

            this.interval = setInterval(() => {
                this.send(EVENTS.SERVICE.PING, this.getUser());
            }, 10 * 1000);

            this.ws.onclose = () => {
                console.log(`WebSocket close on address ${host}`);
                clearInterval(this.interval);
            };
        };

        this.ws.onmessage = (event) => {
            console.log('WebSocket message:', event);
        };

        this.ws.onerror = (event) => {
            console.log('WebSocket error:', event);
        };

        this.ws.onclose = () => {
            console.log('WebSocket close:', event);
        };
    }

    getUser() {
        return (new Router()).getUser();
    }

    handleMessage(event) {
        const messageText = event.data;

        try {
            const message = JSON.parse(messageText);
            console.log('HandleMessage:', message);

            (new Mediator()).emit(message.event, message.payload);
        } catch (e) {
            throw new TypeError('HandleMessage parse error', messageText, e);
        }
    }

    send(event, payload = null) {
        let data;

        if (payload) {
            data = JSON.stringify({ event, payload });
        } else {
            data = JSON.stringify({ event, payload: '' });
            throw new TypeError('Payload is empty');
        }
        console.log('Send:', data);

        this.ws.send(data);
    }
}
