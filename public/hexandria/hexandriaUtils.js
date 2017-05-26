import Router from '../modules/router';

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

    static copy(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    static packToMove(selected, position) {
        const data = {};
        data.from = HexandriaUtils.copy(selected.squad.position);
        data.to = HexandriaUtils.copy(position);
        return data;
    }

    static packToCreate(owner, position, count, morale) {
        const data = {};
        data.owner = owner;
        data.position = HexandriaUtils.copy(position);
        data.count = count;
        data.morale = morale;
        return data;
    }

    static packToUpdate(selected, count, morale, newPositon = null) {
        const data = {};
        data.position = HexandriaUtils.copy(selected.squad.position);
        if (newPositon) {
            data.newPosition = HexandriaUtils.copy(newPositon);
        } else {
            data.newPosition = HexandriaUtils.copy(data.position);
        }
        data.newCount = count;
        data.newMorale = morale;
        return data;
    }

    static packToDelete(selected) {
        const data = {};
        data.position = HexandriaUtils.copy(selected.squad.position);
        return data;
    }

    static packToAttackTown(selected) {
        const data = {};
        data.position = HexandriaUtils.copy(selected.squad.position);
        data.newOwner = selected.player.name;
        return data;
    }

    static packResult(winner, loser) {
        return {
            winner,
            loser,
        };
    }

    static checkUser(playerName) {
        const user = (new Router()).getUser();
        if (user === 'guest') {
            return true;
        } else if (user === playerName) {
            return true;
        }
        return false;
    }
}
