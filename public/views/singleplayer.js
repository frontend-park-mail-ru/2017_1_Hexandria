import GameView from './gameView';

export default class SingleplayerView extends GameView {
    constructor(options = {}) {
        super(options);

        this.mode = 'singleplayer';
    }
}
