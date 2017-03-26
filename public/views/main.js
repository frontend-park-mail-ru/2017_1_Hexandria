;(function () {
    "use strict";

    const View = window.View;

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


            const registerPanel = new RegisterPanel({
                el: document.createElement("div"),
                data: {
                    login: {
                        text: "Log In",
                        attrs: {
                            class: "register_panel__login",
                        },
                        events: {
                            click: (event) => {(new Router()).go("/login")}
                        },
                    },
                    signup: {
                        text: "Sign Up",
                        attrs: {
                            class: "register_panel__signup",
                        },
                        events: {
                            click: (event) => {(new Router()).go("/signup")}
                        },
                    },
                },
            });
            pageIndex.appendChild(registerPanel.el);

            const userPanel = new UserPanel({
                el: document.createElement("div"),
                data: {
                    username: "Dolan",
                },
            });
            userPanel.hide();
            pageIndex.appendChild(userPanel.el);


            this._el = pageIndex;
            this.hide();
        }

        init(options = {}) {
        }
    }

    window.MainView = MainView;
})();

