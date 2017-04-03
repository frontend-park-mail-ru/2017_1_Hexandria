"use strict";

    //const Router = window.Router;

    // const SingleplayerView = window.SingleplayerView;
    // const MultiplayerView = window.MultiplayerView;
    // const AboutView = window.AboutView;
    // const ScoreboardView = window.ScoreboardView;
    // const LoginView = window.LoginView;
    // const SignupView = window.SignupView;
    // const MainView = window.MainView;


    // const Mediator = window.Mediator;
    // const HexandriaApp = window.HexandriaApp;
    import './main.scss';
    import Router from './modules/router';
    import MultiplayerView from './views/multiplayer';
    import SingleplayerView from './views/singleplayer';
    import AboutView from './views/about';
    import ScoreboardView from './views/scoreboard';
    import LoginView from './views/login';
    import SignupView from './views/signup';
    import MainView from './views/main';

    import Mediator from './modules/mediator';
    import HexandriaApp from './hexandria/hexandriaApp';

    const app = new HexandriaApp();
    (new Mediator()).done();


    (new Router())
        .addRoute("/singleplayer", SingleplayerView)
        .addRoute("/multiplayer", MultiplayerView)
        .addRoute("/about", AboutView)
        .addRoute("/scoreboard", ScoreboardView)
        .addRoute("/login", LoginView)
        .addRoute("/signup", SignupView)
        .addRoute("/", MainView)
        .start();