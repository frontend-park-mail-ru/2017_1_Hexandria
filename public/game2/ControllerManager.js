"use strict";

class ControllerManager {
    constructor() {
        console.log("ControllerManager created");
        window.onkeypress = function(e){
            console.log("asdfasdf");
            if (e.keyCode == 13) {
                (new MediatorNew()).emit(EVENTS.KEYBOARD.ENTER_PRESSED)
            }
        }
    }

    on(message) {

    }
}