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
            console.log(`webSocket open on address ${host}`);

            console.dir(this.ws);

            this.send(EVENTS.SERVICE.CONNECT, (new Router()).getUser());

            this.ws.onmessage = this.handleMessage.bind(this);

            this.interval = setInterval(() => {
                console.log('ws send update');
                this.send(EVENTS.SERVICE.PING, (new Router()).getUser());
            }, 10 * 1000);

            this.ws.onclose = () => {
                console.log(`webSocket close on address ${host}`);
                clearInterval(this.interval);
            };
        };

        this.ws.onmessage = (event) => {
            console.log('webSocket message:', event);
        };

        this.ws.onerror = (event) => {
            console.log('webSocket error:', event);
        };

        this.ws.onclose = () => {
            console.log('webSocket close:', event);
        };
    }

    handleMessage(event) {
        const messageText = event.data;
        const message = JSON.parse(messageText);
        console.log('message...', message);

        (new Mediator()).emit(message.type, message.payload);
    }

    send(event, payload = null) {
        let data;

        if (payload) {
            data = JSON.stringify({ event, payload });
        } else {
            data = JSON.stringify({ event, payload: '' });
            throw new TypeError('Payload is empty');
        }
        console.log('sending...', data);

        this.ws.send(data);
    }
}
