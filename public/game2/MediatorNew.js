"use strict";

class MediatorNew {

    constructor() {
        if(MediatorNew.__instance) {
            return MediatorNew.__instance;
        }
        MediatorNew.__instance = this;
        this.objects = [];
        this.events = {};
    }

    subscribe(subscriber, event, handler) {
        if(!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push({subscriber: subscriber, handler: handler});
        return this;
    }

    postEmit(event, options) {
        if(this.events[event]) {
            this.events[event].forEach(element => element.subscriber[element.handler](options));
        }

    }

    done() {
        console.log("done");
        if(this.emitStack) {
            this.emitStack.forEach((storedElement) => {
                this.postEmit(storedElement.event, storedElement.options)
            })
        }
        this.emit = function (event, options = null) {
            this.postEmit(event, options)
        }
    }

    emit(event, options = null) {
        if(!this.emitStack) {
            this.emitStack = [];
        }
        this.emitStack.push({event: event, options: options});
    }
}