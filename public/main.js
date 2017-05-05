import './main.scss';

import Router from './modules/router';
import Mediator from './modules/mediator';
import SwLoader from './modules/swLoader';
import HexandriaApp from './hexandria/hexandriaApp';

import MultiplayerView from './views/multiplayer';
import SingleplayerView from './views/singleplayer';
import AboutView from './views/about';
import ScoreboardView from './views/scoreboard';
import LoginView from './views/login';
import SignupView from './views/signup';
import MainView from './views/main';


const app = new HexandriaApp();
(new Mediator()).done();

SwLoader.register('../../sw.js');
// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('sw.js')
//         .then(function (registration) {
//             console.log('ServiceWorker registration', registration);
//         })
//         .catch(function (err) {
//             console.error(err);
//         });
// }

(new Router())
    .addRoute('/singleplayer', SingleplayerView)
    .addRoute('/multiplayer', MultiplayerView)
    .addRoute('/about', AboutView)
    .addRoute('/scoreboard', ScoreboardView)
    .addRoute('/login', LoginView)
    .addRoute('/signup', SignupView)
    .addRoute('/', MainView)
    .start();
