export default class Mediator {

    constructor() {
        if (Mediator.__instance) {
            return Mediator.__instance;
        }
        Mediator.__instance = this;
        this.events = {};

        this.emit = this.emitBefore;
    }

    subscribe(subscriber, event, handler) {
        if (!subscriber) {
            console.error('subscribe: empty subscriber', subscriber, event, handler);
            return;
        }

        if (!event) {
            console.error('subscribe: empty event', subscriber, event, handler);
            return;
        }

        if (!handler) {
            console.error('subscribe: empty handler', subscriber, event, handler);
            return;
        }

        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push({ subscriber, handler });
        return this;
    }

    unsubscribe(subscriber, event) {
        // TODO
    }

    done() {
        if (this.emitStack) {
            this.emitStack.forEach((storedElement) => {
                this.emitAfter(storedElement.event, storedElement.options);
            });
        }
        this.emitStack = null;

        this.emit = this.emitAfter;
    }

    emitBefore(event, options = null) {
        console.log('EMIT before:', event, options);

        if (!this.emitStack) {
            this.emitStack = [];
        }
        this.emitStack.push({ event, options });
    }

    emitAfter(event, options = null) {
        console.log('emit: ', event, options);

        if (!event) {
            console.error('emit: empty event');
            return;
        }

        if (this.events[event]) {
            this.events[event].forEach((element) => {
                element.subscriber[element.handler](options);
            });
        } else {
            console.log('emit: no subscribers');
        }
    }

    clear() {
        this.events = {};
    }

    _print() {
        console.log('-----');
        Object.keys(this.events).forEach((element) => {
            console.log('  ', element);
            this.events[element].forEach((event) => {
                console.log('    ', event);
            });
        });
        console.log('-----');
    }
}
