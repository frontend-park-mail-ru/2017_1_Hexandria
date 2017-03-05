(function() {
    'use strict';

    class Hex {
        constructor({ data = [], el }) {
            this.data = data;
            this.el = el;
            this.render();
        }

        render() {
            this._updateHtml();
            this._installControls();
        }

        _updateHtml() {
            this.el.setAttribute('class', 'hex');
            this.el.innerHTML = `
                <div class="hex__minor_hex" id="minor_hex">
                    <div class="hex__title" id="hex__title">
                        hexandria
                    </div>
                    <div class="hex__motto" id="hex__motto">
                        You are the ruler.
                    </div>
                    <div class="hex__buttons" id="buttons">
                        <div class="hex__buttons-main"></div>
                        <div class="hex__buttons-minor"></div>
                    </div>
                </div>
            `;
        }

        _installControls() {
            this.singleplayer = new Button(this.data.singleplayer).render();
            this.multiplayer = new Button(this.data.multiplayer).render();
            this.about = new Button(this.data.about).render();
            this.scoreboard = new Button(this.data.scoreboard).render();
            this.el.querySelector('.hex__buttons-main').appendChild(this.singleplayer.el);
            this.el.querySelector('.hex__buttons-main').appendChild(this.multiplayer.el);
            this.el.querySelector('.hex__buttons-minor').appendChild(this.about.el);
            this.el.querySelector('.hex__buttons-minor').appendChild(this.scoreboard.el);
        }
    }

    window.Hex = Hex;
})();