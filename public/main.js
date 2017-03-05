'use strict';

(function() {
    let pageIndex = document.getElementById('index');
    let pageSingleplayer = document.getElementById('singleplayer');
    let pageMultiplayer = document.getElementById('multiplayer');
    let pageAbout = document.getElementById('about');
    let pageScoreboard = document.getElementById('scoreboard');
    let pageLogin = document.getElementById('login');
    let pageSignup = document.getElementById('signup');

    let hex = new Hex({
        el: document.createElement('div'),
        data: {
            singleplayer: {
                text: "Singleplayer",
                attrs: {
                    class: "hex__singleplayer"
                }
            },
            multiplayer: {
                text: "Multiplayer",
                attrs: {
                    class: "hex__multiplayer"
                }
            },
            about: {
                text: "About",
                attrs: {
                    class: "hex__about"
                }
            },
            scoreboard: {
                text: "Scoreboard",
                attrs: {
                    class: "hex__scoreboard"
                }
            }
        }
    });

    let userPanel = new UserPanel({
        el: document.createElement('div')
    });

    let registerPanel = new RegisterPanel({
        el: document.createElement('div'),
        data: {
            login: {
                text: "Log In",
                attrs: {
                    class: "register_panel__login"
                }
            },
            signup: {
                text: "Sign Up",
                attrs: {
                    class: "register_panel__signup"
                }
            }
        }
    });

    // Register panel buttons
    function registerPanelClickDecorator(object) {
        return function() {
            pageIndex.hidden = true;
            object.hidden = false;
        }
    }
    registerPanel.login.on('click', registerPanelClickDecorator(pageLogin));
    registerPanel.signup.on('click', registerPanelClickDecorator(pageSignup));

    // Hex buttons
    function hexClickDecorator(object) {
        return function() {
            pageIndex.hidden = true;
            object.hidden = false;
        }
    }
    hex.singleplayer.on('click', hexClickDecorator(pageSingleplayer));
    hex.multiplayer.on('click', hexClickDecorator(pageMultiplayer));
    hex.about.on('click', hexClickDecorator(pageAbout));
    hex.scoreboard.on('click', hexClickDecorator(pageScoreboard));

    // Create titles
    function titleCreateDecorator(string) {
        return {
            el: document.createElement('div'),
            title: string
        }
    }
    let titleSingleplayer = new Title(titleCreateDecorator("Singleplayer"));
    let titleMultiplayer = new Title(titleCreateDecorator("Multiplayer"));
    let titleAbout = new Title(titleCreateDecorator("About"));
    let titleScoreboard = new Title(titleCreateDecorator("Scoreboard"));
    let titleLogin = new Title(titleCreateDecorator("Login"));
    let titleSignup = new Title(titleCreateDecorator("Signup"));

    pageSingleplayer.appendChild(titleSingleplayer.el);
    pageMultiplayer.appendChild(titleMultiplayer.el);
    pageAbout.appendChild(titleAbout.el);
    pageScoreboard.appendChild(titleScoreboard.el);
    pageLogin.appendChild(titleLogin.el);
    pageSignup.appendChild(titleSignup.el);

    pageIndex.appendChild(hex.el);
    pageIndex.appendChild(registerPanel.el);
    pageIndex.appendChild(userPanel.el);

    userPanel.hidden = true;

    pageIndex.hidden = false;
    pageSingleplayer.hidden = true;
    pageMultiplayer.hidden = true;
    pageAbout.hidden = true;
    pageScoreboard.hidden = true;
    pageLogin.hidden = true;
    pageSignup.hidden = true;
})();