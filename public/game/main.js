"use strict";

const GameProcess = function() {
    let map = GameStart();

    let player1 = new PlayerGame("Player 1", 0xff0000);
    let player2 = new PlayerGame("Player 2", 0x0000ff);

    map.createCapital(player1, 4, 9);
    map.createCapital(player2, 0, 0);

    map.createUnit(player1, 1, 1);
    map.createUnit(player2, 3, 8);
};
