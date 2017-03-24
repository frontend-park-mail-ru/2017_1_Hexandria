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
                        },
                        multiplayer: {
                            text: "Multiplayer",
                            attrs: {
                                class: "hex__multiplayer",
                            },
                        },
                        about: {
                            text: "About",
                            attrs: {
                                class: "hex__about",
                            },
                        },
                        scoreboard: {
                            text: "Scoreboard",
                            attrs: {
                                class: "hex__scoreboard",
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
                    },
                    signup: {
                        text: "Sign Up",
                        attrs: {
                            class: "register_panel__signup",
                        },
                    },
                },
            });
            registerPanel.login.el.addEventListener("click", event => {
                console.log("login click");
                event.preventDefault();
                this.router.go('/login');
            });
            registerPanel.signup.el.addEventListener("click", event => {
                console.log("signup click");
                event.preventDefault();
                this.router.go('/signup');
            });
            pageIndex.appendChild(registerPanel.el);

            /*const userPanel = new UserPanel({
                el: document.createElement("div"),
                data: {
                    username: "Dolan",
                },
            });
            pageIndex.appendChild(userPanel.el);*/


            this._el = pageIndex;
            this.hide();
        }

        init(options = {}) {
        }
    }

    window.MainView = MainView;
})();

