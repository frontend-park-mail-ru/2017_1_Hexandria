;(function () {
    "use strict";

    const View = window.View;

    class MainView extends View {
        constructor(options = {}) {
            super(options);

            this.fetcher = new Fetcher();

            const pageIndex = document.getElementById("index");

            const hex = new Hex({
                el: document.createElement("div"),
                data: {
                    hex_title: "hexandria",
                    hex_phrase: "You are the ruler",
                    controls: {
                        singleplayer: {
                            text: "Singleplayer",
                            attrs: {
                                class: "hex__singleplayer",
                            },
                            events: {
                                click: (event) => {(new Router()).go("/singleplayer")}
                            },
                        },
                        multiplayer: {
                            text: "Multiplayer",
                            attrs: {
                                class: "hex__multiplayer",
                            },
                            events: {
                                click: (event) => {(new Router()).go("/multiplayer")}
                            },
                        },
                        about: {
                            text: "About",
                            attrs: {
                                class: "hex__about",
                            },
                            events: {
                                click: (event) => {(new Router()).go("/about")}
                            },
                        },
                        scoreboard: {
                            text: "Scoreboard",
                            attrs: {
                                class: "hex__scoreboard",
                            },
                            events: {
                                click: (event) => {(new Router()).go("/scoreboard")}
                            },
                        },
                    },
                },
            });
            pageIndex.appendChild(hex.el);


            this.registerPanel = new RegisterPanel();
            pageIndex.appendChild(this.registerPanel.el);

            this.userPanel = new UserPanel();
            pageIndex.appendChild(this.userPanel.el);

            this.getUser();


            this._el = pageIndex;
            this.hide();
        }

        init(options = {}) {
        }

        getUser() {
            // Autorization check on startup
            /*this.fetcher.fetch("/api/user", "GET")
                .then((okJSON) => {
                    console.log(okJSON);
                    console.log(okJSON.description);
                    this.userPanel.show();
                    this.registerPanel.hide();
                })
                .catch(this.fetcher.errorCatcher);*/
            this.fetcher.get(api.path.user)
                .then((res) => {
                    if(res.status === api.code.OK) {
                        this.userPanel.show();
                        this.registerPanel.hide();
                    } else {
                        this.userPanel.hide();
                        this.registerPanel.show();
                    }
                });
        }

    }

    window.MainView = MainView;
})();

