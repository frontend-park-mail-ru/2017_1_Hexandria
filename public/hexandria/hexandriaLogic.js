import Mediator from '../modules/mediator';
import { EVENTS } from './events';
import HexandriaUtils from './hexandriaUtils';

export default class HexandriaLogic {
    constructor() {
        console.log('HexandriaLogic');

        if (this.constructor === HexandriaLogic) {
            throw new TypeError('Can not create instance of HexandriaLogic');
        }

        this.game = null;
        this._selected = null;
        this._activePlayer = null;
        this._turnTimeout = null;
    }

    initGame(game) {
        game.players[0].turn = true;
        game.players[1].turn = false;
        this.game = game;

        this._locker = true;

        HexandriaUtils.forPlayersSquads(
            this.game,
            (object) => {
                object.squad.lock = false;
            },
        );

        (new Mediator()).subscribe(this, EVENTS.UI.TURN_CLICK, '_onUiTurnClick');
        (new Mediator()).subscribe(this, EVENTS.GAME.TURN, '_onGameTurn');

        (new Mediator()).subscribe(this, EVENTS.LOGIC.SELECT, 'onSelect');
        (new Mediator()).subscribe(this, EVENTS.LOGIC.CREATE, 'onCreate');
        (new Mediator()).subscribe(this, EVENTS.LOGIC.UPDATE, 'onUpdate');
        (new Mediator()).subscribe(this, EVENTS.LOGIC.DELETE, 'onDelete');
        (new Mediator()).subscribe(this, EVENTS.LOGIC.ATTACK_TOWN, 'onAttackTown');

        this._onGameTurn();
        this._onGameTurn();

        this.eventInfo();
    }

    destroy() {
        delete this.game;
        delete this._selected;

        if (this._turnTimeout) {
            clearInterval(this._turnTimeout);
        }
    }

    unlockSquads() {
        HexandriaUtils.forPlayersSquads(
            this.game,
            (object) => {
                object.squad.lock = false;
            },
        );
    }

    _startTimeout() {
        console.error('override it!');
    }

    _checkUser() {
        console.error('override it!');
    }

    _checkTurnEnd() {
        if (this._checkUser(this._activePlayer.name)) {
            // console.warn('_checkTurnEnd', this._activePlayer, this._activePlayer.squads);
            const sq = this._activePlayer.squads.find(function(s) {
                return s.lock !== true;
            });
            // console.log(sq);
            if (!sq) {
                // console.error('_checkTurnEnd TURN!');
                this.unlockSquads();
                this.eventTurn();
            }
        }
    }

    onSelect(position) {
        // console.log('onselect', position, this._selected);

        if (position) {
            if (this._selected) {
                if (this.checkNearSelected(position)) {
                    const data = HexandriaUtils.packToMove(this._selected, position);
                    this.eventMove(data);
                }
                this._selected = null;
                (new Mediator()).emit(EVENTS.GRAPHICS.UNSELECT_ALL);
            } else {
                const squadObject = this.findSquad(position);

                if (squadObject &&
                    squadObject.player.turn &&
                    !squadObject.squad.lock &&
                    this._checkUser(squadObject.player.name)) {
                    this._selected = squadObject;
                    (new Mediator()).emit(EVENTS.GRAPHICS.SELECT_UNIT, this._selected.squad.position);
                }
            }
        } else {
            this._selected = null;
            (new Mediator()).emit(EVENTS.GRAPHICS.UNSELECT_ALL);
        }
    }

    eventInfo() {
        const payload = JSON.parse(JSON.stringify(this.game.players));

        (new Mediator()).emit(EVENTS.GAME.INFO, payload);
    }

    eventTurn() {
        console.error('override it!');
    }

    eventMove(data) {
        console.error('override it!');
    }

    _onUiTurnClick() {
        this.eventTurn();
    }

    _onGameTurn() {
        this.unlockSquads();

        if (this.game.players[0].turn) {
            this.game.players[0].turn = false;

            this._activePlayer = this.game.players[1];
            this._activePlayer.turn = true;
        } else {
            this.game.players[1].turn = false;

            this._activePlayer = this.game.players[0];
            this._activePlayer.turn = true;
        }

        if (this._checkUser(this._activePlayer.name)) {
            (new Mediator()).emit(EVENTS.UI.TURN_SHOW);
        } else {
            (new Mediator()).emit(EVENTS.UI.TURN_HIDE);
        }

        this._startTimeout();

        this.eventInfo();

        this._locker = true;
    }

    onCreate(data) {
        console.log('onCreate', data);

        const player = this.game.players.find(function(p) {
            return p.name === data.owner;
        });
        if (player) {
            const newSquad = {
                count: data.count,
                morale: data.morale,
                position: data.position,
                lock: false,
            };

            player.squads.push(newSquad);

            const createData = {
                name: player.name,
                color: player.color,
                squad: newSquad,
            };
            (new Mediator()).emit(EVENTS.GRAPHICS.SQUAD_CREATE, createData);
        }
    }

    onUpdate(data) {
        console.log('onUpdate', data);
        const position = data.position;
        const newPosition = data.newPosition;
        const newCount = data.newCount;
        const newMorale = data.newMorale;

        const squadObject = this.findSquad(position);
        if (!squadObject) {
            console.error('Can not find squad.');
            return;
        }

        if (newPosition) {
            console.log(squadObject, newPosition);
            squadObject.squad.position.x = newPosition.x;
            squadObject.squad.position.y = newPosition.y;

            const graphicsData = {
                playerName: squadObject.player.name,
                squadIndex: squadObject.squadIndex,
                position: newPosition,
            };
            (new Mediator()).emit(EVENTS.GRAPHICS.SQUAD_MOVE, graphicsData);
        }

        if (newCount || newMorale) {
            const playerIndex = squadObject.playerIndex;
            const squadIndex = squadObject.squadIndex;
            const squad = squadObject.squad;

            if (newCount) {
                this.game.players[playerIndex].squads[squadIndex].count = newCount;
            }
            if (newMorale) {
                this.game.players[playerIndex].squads[squadIndex].morale = newMorale;
            }

            const graphicsData = {
                playerName: this.game.players[playerIndex].name,
                squadIndex,
                squad,
            };
            (new Mediator()).emit(EVENTS.GRAPHICS.SQUAD_UPDATE, graphicsData);
        }

        if (this._locker) {
            squadObject.squad.lock = true;
        }
        this._checkTurnEnd();
    }

    onDelete(data) {
        console.log('onDelete', data);
        const position = data.position;
        const squadObject = this.findSquad(position);
        if (!squadObject) {
            console.error('Can not find squad.');
            return;
        }

        this.game.players[squadObject.playerIndex].squads.splice(squadObject.squadIndex, 1);

        const graphicsData = {
            playerName: this.game.players[squadObject.playerIndex].name,
            squadIndex: squadObject.squadIndex,
        };
        (new Mediator()).emit(EVENTS.GRAPHICS.SQUAD_DELETE, graphicsData);

        this._checkTurnEnd();
    }

    onAttackTown(data) {
        console.log('onAttackTown', data);

        const position = data.position;
        const newOwner = data.newOwner;

        const town = this.findTown(position);
        if (!town) {
            console.error('Can not find town.');
            return;
        }

        console.log(town);

        HexandriaUtils.forPlayers(
            this.game,
            ({ playerIndex, player }) => {
                const index = player.towns.indexOf(town.name);
                if (index !== -1) {
                    this.game.players[playerIndex].towns.splice(index, 1);
                }
            },
        );

        const newOwnerObject = this.game.players.find(function(p) {
            return p.name === newOwner;
        });

        console.log(newOwnerObject);

        newOwnerObject.towns.push(town.name);

        const graphicsData = {
            playerColor: newOwnerObject.color,
            townName: town.name,
        };
        (new Mediator()).emit(EVENTS.GRAPHICS.TOWN_CAPTURE, graphicsData);
    }

    findSquad(position) {
        let result = null;

        HexandriaUtils.forPlayersSquads(
            this.game,
            (object) => {
                if (object.squad.position.x === position.x &&
                    object.squad.position.y === position.y) {
                    result = object;
                }
            },
        );
        return result;
    }

    findTown(position) {
        let result = null;

        HexandriaUtils.forFieldTowns(
            this.game,
            (town) => {
                if (town.position.x === position.x &&
                    town.position.y === position.y) {
                    result = town;
                }
            },
        );
        return result;
    }

    checkNearSelected(position) {
        if (this._selected) {
            const result = HexandriaUtils.nearElements(this.game.field.size.x, this.game.field.size.y, this._selected.squad.position);

            let bool = false;
            result.forEach((element) => {
                if (element.x === position.x && element.y === position.y) {
                    bool = true;
                }
            });
            return bool;
        }
        return false;
    }
}
