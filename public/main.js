;(function() {
    "use strict";

    const Router = window.Router;

    const SingleplayerView = window.SingleplayerView;
    const MultiplayerView = window.MultiplayerView;
    const AboutView = window.AboutView;
    const ScoreboardView = window.ScoreboardView;
    const LoginView = window.LoginView;
    const SignupView = window.SignupView;
    const MainView = window.MainView;

    (new Router())
        .addRoute("/singleplayer", SingleplayerView)
        .addRoute("/multiplayer", MultiplayerView)
        .addRoute("/about", AboutView)
        .addRoute("/scoreboard", ScoreboardView)
        .addRoute("/login", LoginView)
        .addRoute("/signup", SignupView)
        .addRoute("/", MainView)
        .start();
})();
