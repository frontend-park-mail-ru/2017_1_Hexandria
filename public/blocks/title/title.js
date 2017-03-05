(function() {
    'use strict';

    class Title {
        constructor({ title, el }) {
            this.title = title;
            this.el = el;
            this.render();
        }

        render() {
            this._updateHtml();
        }

        _updateHtml() {
            this.el.setAttribute('class', 'title');
            this.el.innerHTML = this.title;
        }
    }

    window.Title = Title;
})();