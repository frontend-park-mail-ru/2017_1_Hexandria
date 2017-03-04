(function() {
    'use strict';

    class Hex {
        constructor({ el }) {
            this.el = el;
            this.render();
        }

        render() {
            this._updateHtml();
            // this._installControls();
        }

        _updateHtml() {
            this.el.innerHTML = `
                <div class="hex" id="hex">
                    <div class="hex__minor_hex" id="minor_hex">
                        <div class="hex__title" id="hex__title">
                            hexandria
                        </div>
                        <div class="hex__motto" id="hex__motto">
                            You are the ruler.
                        </div>
                        <div class="hex__buttons" id="buttons">
                            <div class="hex__main_buttons">
                                <button class="hex__singleplayer" id="button_singleplayer">Singleplayer</button>
                                <button class="hex__multiplayer" id="button_multiplayer">Multiplayer</button>
                            </div>
                            <div class="hex__minor_buttons">
                                <button class="hex__scoreboard" id="button_scoreboard">Scoreboard</button>
                                <button class="hex__about" id="button_about">About</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    window.Hex = Hex;
})();