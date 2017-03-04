(function() {
    'use strict';

    let Button = window.Button;

    class RegisterPanel {
        constructor({ el, login, signup }) {
            this.el = el;
            this.login = new Button(login).render();
            this.signup = new Button(signup).render();
            this.render();
        }

        render() {
            this._updateHtml();
            this._installControls();
        }

        _updateHtml() {
            this.el.innerHTML = `
                <div class="register_panel">
                    ${this.login.toString()}
                    ${this.signup.toString()}
                </div>
            `;
        }

        _installControls () {

        }

        on (type, callback) {
            this.el.addEventListener(type, callback);
        }
    }

    window.RegisterPanel = RegisterPanel;
})();