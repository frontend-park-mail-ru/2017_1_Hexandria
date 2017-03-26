;(function () {
    "use strict";

    let id = 0;

    /**
     * Route class
     */
    class Route {
        /**
         * Create new route
         * @param {string} pathname
         * @param {View} view
         * @param {Object} [options={}]
         */
        constructor(pathname, view, options = {}) {
            this.pathToRegex = window.pathToRegex;

            this.id = `p${id}`;
            id++;
            this.pathname = pathname;
            this.regex = this.pathToRegex(pathname);
            this.View = view;
            this.options = options;
        }

        /**
         * Check pathname
         * @param {string} pathname
         * @returns {boolean}
         */
        match(pathname) {
            return !!this.regex(pathname);
        }

        /**
         * Activate current route
         * @param {string} pathname
         * @param {Object} [state={}]
         */
        navigate(pathname, state = {}) {
            state = state || {};
            const keys = this.regex(pathname);
            if (!this._view) {
                const view = new this.View(this.options);
                view.init(this.options);
                view.setRouter(this.__router);
                this._view = view;
            }

            this._view.resume(Object.assign(state, keys));
        }

        /**
         * Deactivate current route
         */
        leave() {
            this._view && this._view.pause();
        }

        /**
         * set new Route instance
         * @param {Router} router
         */
        setRouter(router) {
            this.__router = router;
        }
    }

    window.Route = Route;
})();
