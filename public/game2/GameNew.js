"use strict";

class GameNew {
    constructor(options) {
        console.log("GameNew created");
        this.userIndexHuman = 0;
        this.sizeX = options.size.x;
        this.sizeY = options.size.y;
        console.log(this.sizeX, "x", this.sizeY);
        (new MediatorNew()).subscribe(this, EVENTS.KEYBOARD.ENTER_PRESSED, "enterPressed");
        (new MediatorNew()).subscribe(this, EVENTS.TURN.START_TURN, "gameLoop");
        (new MediatorNew()).emit("drawMapEvent", {sizeX: this.sizeX, sizeY: this.sizeY});
    }

    on(message) {
        console.log("MESSAGE RECEIVED");
        console.log(message.from);
        console.log(message.to);
        console.log(message.text);
        console.log(message.options);
    }

    enterPressed() {
        if(this.userIndex == this.userIndexHuman) {
            console.log("Enter pressed");
        }
    }

    gameLoop(options) {
        console.log("start turn");
        console.log(options.userIndex);

    }

    startGameLoop() {
        this.userIndex = 0;
        this.interval = setInterval(() => {
            this.userIndex = (this.userIndex + 1) % 3;
            (new MediatorNew()).emit(EVENTS.TURN.START_TURN, {userIndex: this.userIndex})
        }, 3000);
    }


}