;(function() {
    "use strict";

    class HexandriaMain {
        constructor(options) {
            console.log("HexandriaMain created");

            const game = new HexandriaGame({
                size: {
                    x: 5,
                    y: 10,
                },
            });

            const graphics = new HexandriaGraphics();

            (new Mediator()).done();

            game.startGameLoop();
        }
    }

    window.HexandriaMain = HexandriaMain;
})();


/*
let game = new GameNew({
    size: {
        x: 5,
        y: 10
    }
});

let graphics = new GraphicsNew();
let controller = new ControllerManager();

(new MediatorNew()).done();

game.startGameLoop();
*/
