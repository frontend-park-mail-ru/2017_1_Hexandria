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

    static nearElements(sizeX, sizeY, position) {
        const result = [];

        result.push({ x: position.x - 1, y: position.y });
        result.push({ x: position.x + 1, y: position.y });
        if (position.y % 2 === 1) {
            result.push({ x: position.x - 1, y: position.y - 1 });
            result.push({ x: position.x, y: position.y - 1 });
            result.push({ x: position.x - 1, y: position.y + 1 });
            result.push({ x: position.x, y: position.y + 1 });
        } else {
            result.push({ x: position.x + 1, y: position.y - 1 });
            result.push({ x: position.x, y: position.y - 1 });
            result.push({ x: position.x + 1, y: position.y + 1 });
            result.push({ x: position.x, y: position.y + 1 });
        }
        return result.filter(element => element.x >= 0 && element.x < sizeX && element.y >= 0 && element.y < sizeY);
    }

    static packToMove(selected, position) {
        const data = {};
        data.from = JSON.parse(JSON.stringify(selected.squad.position));
        data.to = JSON.parse(JSON.stringify(position));
        return data;
    }

    static unpackToMove(data) {
        // TODO
    }

    static packToUpdate(selected, count, morale) {
        const data = {};
        data.playerIndex = selected.playerIndex;
        data.squadIndex = selected.squadIndex;
        data.squad = {
            count,
            morale,
        };
        return data;
    }

    static unpackToUpdate(data) {
        // TODO
    }

    static packToDelete(selected) {
        const data = {};
        data.playerIndex = selected.playerIndex;
        data.squadIndex = selected.squadIndex;
        data.squad = selected.squad;
        return data;
    }

    static unpackToDelete(data) {
        // TODO
    }

    static packToAttackCapital(selected, enemyIndex, town) {
        const data = {};
        data.playerIndex = selected.playerIndex;
        data.enemyIndex = enemyIndex;
        data.townName = town.name;
        return data;
    }

    static unpackToAttackCapital(data) {
        // TODO
    }

    static packToAttackTown(selected, enemyIndex, town) {
        const data = {};
        data.playerIndex = selected.playerIndex;
        data.enemyIndex = enemyIndex;
        data.townName = town.name;
        return data;
    }

    static unpackToAttackTown(data) {
        // TODO
    }

    static packResult(winner, loser) {
        return {
            winner,
            loser,
        };
    }

    static unpackResult(data) {
        // TODO
    }
}
