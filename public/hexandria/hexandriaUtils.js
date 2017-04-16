export default class HexandriaUtils {
    static forPlayers(game, handler) {
        const players = game.players;
        for (const [playerIndex, player] of players.entries()) {
            handler({ playerIndex, player });
        }
    }

    static forPlayersTowns(game, handler) {
        const players = game.players;
        for (const [playerIndex, player] of players.entries()) {
            for (const [townIndex, town] of player.towns.entries()) {
                handler({ playerIndex, player, townIndex, town });
            }
        }
    }

    static forPlayersSquads(game, handler) {
        const players = game.players;
        for (const [playerIndex, player] of players.entries()) {
            for (const [squadIndex, squad] of player.squads.entries()) {
                handler({ playerIndex, player, squadIndex, squad });
            }
        }
    }

    static forFieldTowns(game, handler) {
        const towns = game.field.towns;
        for (const town of towns) {
            handler(town);
        }
    }
}
