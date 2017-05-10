import GameView from './gameView';

export default class MultiplayerView extends GameView {
    constructor(options = {}) {
        super(options);

        this.mode = 'Multiplayer';
    }
}
