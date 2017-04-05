"use strict";

import "./main.scss";
import Router from "./modules/router";
import MultiplayerView from "./views/multiplayer";
import SingleplayerView from "./views/singleplayer";
import AboutView from "./views/about";
import ScoreboardView from "./views/scoreboard";
import LoginView from "./views/login";
import SignupView from "./views/signup";
import MainView from "./views/main";

import Mediator from "./modules/mediator";
import HexandriaApp from "./hexandria/hexandriaApp";

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
