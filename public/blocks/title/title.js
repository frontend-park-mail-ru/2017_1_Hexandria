(function() {
    'use strict';

    class Title {
        constructor({ data = {}, el }) {
            this.data = data;
            this.el = el;
            this.render();
        }

        render() {
            this._updateHtml();
        }

        _updateHtml() {
            this.el.innerHTML = `
                <div class="title">${this.data.title}</div>
            `;
        }
    }

    window.Title = Title;
})();