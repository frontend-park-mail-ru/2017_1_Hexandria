"use strict";

class GraphicsNew {
    constructor() {
        console.log("GraphicsNew created");
        (new MediatorNew()).subscribe(this, "drawMapEvent", "drawMap");
    }

    on(message) {
        console.log("MESSAGE RECEIVED");
        console.log(message.from);
        console.log(message.to);
        console.log(message.text);
        console.log(message.options);
    }

    drawMap(options) {
        console.log(options);
    }
}