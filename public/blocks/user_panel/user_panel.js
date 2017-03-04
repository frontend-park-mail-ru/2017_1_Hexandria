(function() {
    'use strict';

    class UserPanel {
        constructor({ data = {}, el }) {
            this.data = data;
            this.el = el;
        }
    }

    window.UserPanel = UserPanel;
})();