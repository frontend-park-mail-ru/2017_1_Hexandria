(function() {
	"use strict";

	class Title {
		constructor({ title, el }) {
			this.title = title;
			this.el = el;
			this.render();
		}

		render() {
			this.updateHtml();
		}

		updateHtml() {
			this.el.setAttribute("class", "title");
			this.el.innerHTML = this.title;
		}
    }

	window.Title = Title;
})();
