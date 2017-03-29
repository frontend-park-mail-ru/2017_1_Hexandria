;(function () {
    "use strict";

    const View = window.View;
    const Hex = window.Hex;
    const UserPanel = window.UserPanel;
    const RegisterPanel = window.RegisterPanel;
    const Router = window.Router;
    const Fetcher = window.Fetcher;
    const api = window.api;

    class MainView extends View {

        constructor(options = {}) {
            super(options);

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
                                click: (event) => { (new Router()).go("/singleplayer"); },
                            },
                        },
                        multiplayer: {
                            text: "Multiplayer",
                            attrs: {
                                class: "hex__multiplayer",
                            },
                            events: {
                                click: (event) => { (new Router()).go("/multiplayer"); },
                            },
                        },
                        about: {
                            text: "About",
                            attrs: {
                                class: "hex__about",
                            },
                            events: {
                                click: (event) => { (new Router()).go("/about"); },
                            },
                        },
                        scoreboard: {
                            text: "Scoreboard",
                            attrs: {
                                class: "hex__scoreboard",
                            },
                            events: {
                                click: (event) => { (new Router()).go("/scoreboard"); },
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

            this.update();

            this.fetcher = new Fetcher();
            this.fetcher.get(api.path.user)
                .then((res) => {
                    if (res.status === api.code.OK) {
                        console.log("ok");
                        return res.json();
                    }
                    throw api.auth.error;
                })
                .then((json) => {
                    console.log(json);
                    // this.login = json.login;
                    (new Router()).setUser(json.login);
                    this.show();
                })
                .catch((err) => {
                    console.log(err);
                });


            this._el = pageIndex;
            this.hide();
        }

        init(options = {}) {
        }

        show(options = {}) {
            super.show();

            this.update();
        }

        update() {
            super.update();


            const user = (new Router()).getUser();
            if (this.user !== user) {
                if (user) {
                    this.userPanel.setUser(user);
                    this.userPanel.show();
                    this.registerPanel.hide();
                } else {
                    this.userPanel.hide();
                    this.registerPanel.show();
                }
                this.user = user;
            }
        }

    }

    window.MainView = MainView;
})();

