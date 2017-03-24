;(function () {
    "use strict";

    const Route = window.Route;

    /**
     * Router class
     */
    class Router {
        /**
         * Singleton constructor
         */
        constructor() {
            if (Router.__instance) {
                return Router.__instance;
            }

            this.routes = [];
            this.activeRoute = null;

            this.history = window.history;
            this.startflag = false;
            Router.__instance = this;
        }

        /**
         * Add new Route in Router
         * @param {string} pathname
         * @param {View} view
         * @param {Object} [options={}]
         * @returns {Router}
         */
        addRoute(pathname, view, options = {}) {
            const route = new Route(pathname, view, options);
            route.setRouter(this);
            this.routes.push(route);
            return this;
        }

        /**
         * Start Router
         * @param {Object} [state={}]
         */
        start(state = {}) {
            this.startflag = true;

            window.onpopstate = function (event) {
                const state = event.state;
                const pathname = window.location.pathname;
                this.onroute(pathname, state);
            }.bind(this);

            const pathname = window.location.pathname;
            this.onroute(pathname, state);
        }

        /**
         * Route to new path
         * @param {string} pathname
         * @param {Object} [state={}]
         */
        onroute(pathname, state = {}) {
            console.log("onroute:", pathname);
            let route = this.routes.find(route => route.match(pathname));

            console.log(route);

            if (!route) {
                return;
            }

            if (this.activeRoute) {
                this.activeRoute.leave();
            }

            this.activeRoute = route;
            this.activeRoute.navigate(pathname, state);
        }

        /**
         * Go to new path
         * @param {string} pathname
         * @param {Object} [state={}]
         */
        go(pathname, state = {}) {
            console.log("pathname:", pathname);
            if (window.location.pathname === pathname) {
                return;
            }
            this.history.pushState(state, "", pathname);
            if(this.startflag){
                this.onroute(pathname, state);
            }
        }

        // /**
        //  * Custom realization History API
        //  * @param {Object} history - должен предоставлять реализацию методов back(), forward(), pushState()
        //  */
        // setHistory(history) {
        //     this.history = history;
        // }
        //
        // /**
        //  * Back in browser history
        //  */
        // back() {
        //     this.history.back();
        // }
        //
        // /**
        //  * Forward in browser history
        //  */
        // forward() {
        //     this.history.forward();
        // }
    }

    window.Router = Router;
})();
