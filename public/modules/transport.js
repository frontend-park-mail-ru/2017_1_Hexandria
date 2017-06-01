import Mediator from './mediator';
import Router from './router';
import { EVENTS } from '../hexandria/events';

export default class Transport {
    constructor(host) {
        if (this.getUser() === 'guest') {
            (new Mediator()).emit(EVENTS.UI.ONLINE, {message: 'Please login'});
            return;
        }

        const address = ['https', 'https:'].includes(location.protocol)
            ? `wss://${host}/game`
            : `ws://${host}/game`;

        this.interval = null;

        this.ws = new WebSocket(address);
        this.ws.onopen = () => {
            console.log(`WebSocket open on address ${address}`);

            // console.dir(this.ws);

            this.send(EVENTS.SERVICE.CONNECT, this.getUser());

            this.ws.onmessage = this.handleMessage.bind(this);

            this.interval = setInterval(() => {
                this.send(EVENTS.SERVICE.PING, this.getUser());
            }, 10 * 1000);

            this.ws.onclose = () => {
                console.log(`WebSocket close on address ${address}`);
                clearInterval(this.interval);

                (new Mediator()).emit(EVENTS.UI.OFFLINE);
            };
        };

        this.ws.onmessage = (event) => {
            console.log('WebSocket message:', event);
        };

        this.ws.onerror = (event) => {
            console.log('WebSocket error:', event);
        };

        this.ws.onclose = (event) => {
            console.log('WebSocket close:', event);

            (new Mediator()).emit(EVENTS.UI.OFFLINE);
        };
    }

    getUser() {
        return (new Router()).getUser();
    }

    handleMessage(event) {
        const messageText = event.data;

        let messageJson = null;
        try {
            messageJson = JSON.parse(messageText);
        } catch (e) {
            console.error('Transport handleMessage parse error', messageText);
        }
        if (messageJson) {
            console.log('HandleMessage:', messageJson);

            (new Mediator()).emit(messageJson.event, messageJson.payload);
        }
    }

    send(event, payload = {}) {
        let data;

        if (event) {
            if (Object.keys(payload).length !== 0) {
                data = JSON.stringify({ event, payload });
            } else {
                data = JSON.stringify({ event });
            }
            console.log('Send:', data);

            this.ws.send(data);
        } else {
            throw new TypeError('Event is empty');
        }
    }

    close() {
        if (this.ws) {
            clearInterval(this.interval);

            this.ws.close();
            delete this.ws;
        }
    }
}
