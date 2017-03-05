(function() {
    'use strict';

    let Button = window.Button;

    class RegisterPanel {
        constructor({ el, data = [] }) {
            this.data = data;
            this.el = el;
            this.render();
        }

        render() {
            this._updateHtml();
            this._installControls();
        }

        _updateHtml() {
            this.el.setAttribute('class', 'register_panel');
        }

        _installControls() {
            this.login = new Button(this.data.login).render();
            this.signup = new Button(this.data.signup).render();
            this.el.appendChild(this.login.el);
            this.el.appendChild(this.signup.el);
        }
    }

    window.RegisterPanel = RegisterPanel;
})();