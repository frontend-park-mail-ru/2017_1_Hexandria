"use strict";

const GameProcess2 = function() {
    let game = new GameNew({size: {x: 5, y: 10}});
    let graphics = new GraphicsNew();
    let controller = new ControllerManager();

    (new MediatorNew()).done();

    game.startGameLoop();
};

GameProcess2();