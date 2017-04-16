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
        console.log('SUBSCRIBE:', subscriber, event, handler);

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
        console.log('DONE');
        if (this.emitStack) {
            this.emitStack.forEach((storedElement) => {
                this.emitAfter(storedElement.event, storedElement.options);
            });
        }

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
        console.log('EMIT after:', event, options);

        if (this.events[event]) {
            this.events[event].forEach((element) => {
                element.subscriber[element.handler](options);
            });
        } else {
            throw new Error('EMIT no subscribers');
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
