"use strict";

const GameProcess = function() {
    let map = GameStart();

    let player1 = new PlayerGame("Player 1", 0xff0000);
    let player2 = new PlayerGame("Player 2", 0x0000ff);

    map.createCapital(player1, 3, 8);
    map.createCapital(player2, 1, 1);
};

