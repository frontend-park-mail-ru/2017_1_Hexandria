'use strict';

(function() {
    let pageIndex = document.getElementById('index');
    let pageSingleplayer = document.getElementById('singleplayer');
    let pageMultiplayer = document.getElementById('multiplayer');
    let pageAbout = document.getElementById('about');
    let pageScoreboard = document.getElementById('scoreboard');
    let pageLogin = document.getElementById('login');
    let pageSignup = document.getElementById('signup');

    // let hex = new Hex({
    //     el: document.createElement('div')
    // });

    let hex = new Hex({
        el: document.createElement('div')
    });

    let registerPanel = new RegisterPanel({
        el: document.createElement('div'),
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
    });

    let userPanel = new UserPanel({
        el: document.createElement('div')
    });

    function registerPanelClickDecorator(object) {
        return function() {
            console.log('in clicker');
            this.parentElement.parentElement.hidden = true;
            object.hidden = false;
        }
    }
    console.log(registerPanel.login.on);
    registerPanel.login.on('click', registerPanelClickDecorator(pageLogin));
    registerPanel.signup.on('click', registerPanelClickDecorator(pageSignup));

    function titleCreateDecorator(string) {
        return {
            el: document.createElement('div'),
            title: string
        }
    }
    let titleAbout = new Title(titleCreateDecorator("About"));
    let titleScoreboard = new Title(titleCreateDecorator("Scoreboard"));
    let titleLogin = new Title(titleCreateDecorator("Login"));
    let titleSignup = new Title(titleCreateDecorator("Signup"));

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