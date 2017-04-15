export default class HexandriaUtils {
    static forPlayer(game, functionForPlayer) {
        const players = game.players;
        for (const [playerIndex, player] of players.entries()) {
            functionForPlayer({ playerIndex, player });
        }
    }

    static forSquad(game, functionForSquad) {
        const players = game.players;
        for (const [playerIndex, player] of players.entries()) {
            for (const [squadIndex, squad] of player.squads.entries()) {
                functionForSquad({ playerIndex, player, squadIndex, squad });
            }
        }
    }

    static forTown(game, functionForTown) {
        const towns = game.field.towns;
        for (const town of towns) {
            functionForTown(town);
        }
    }
}
