'use strict';

// Pages
const page_index = document.getElementById('page_index');
const page_about = document.getElementById('page_about');
const page_scoreboard = document.getElementById('page_scoreboard');
const page_singleplayer = document.getElementById('page_singleplayer');
const page_multiplayer = document.getElementById('page_multiplayer');
const page_login = document.getElementById('page_login');
const page_signup = document.getElementById('page_signup');

// Main menu buttons
const button_about = document.getElementById('button_about');
const button_scoreboard = document.getElementById('button_scoreboard');
const button_singleplayer = document.getElementById('button_singleplayer');
const button_multiplayer = document.getElementById('button_multiplayer');
const button_login = document.getElementById('button_login');
const button_signup = document.getElementById('button_signup');

// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

window.onload = function() {
    page_about.style.visibility = "hidden";
    page_scoreboard.style.visibility = "hidden";
    page_singleplayer.style.visibility = "hidden";
    page_multiplayer.style.visibility = "hidden";
    page_login.style.visibility = "hidden";
    page_signup.style.visibility = "hidden";
    document.body.style.visibility = "visible";

    // main_hex.style.opacity = "0";
    // logo.style.opacity = "0";
    // motto.style.opacity = "0";
    // buttons.style.opacity = "0";
    // registration.style.opacity = "0";
    document.getElementById('registered').style.visibility = "hidden";

    // for(let i = 0; i < 1; i += 0.01) {
    //     await sleep(25);
    //     main_hex.style.opacity = i.toString();
    //     logo.style.opacity = i.toString();
    // }
    //
    // for(let i = 0; i < 1; i += 0.01) {
    //     await sleep(25);
    //     motto.style.opacity = i.toString();
    // }
    // for(let i = 0; i < 1; i += 0.01) {
    //     await sleep(25);
    //     registration.style.opacity = i.toString();
    //     buttons.style.opacity = i.toString();
    // }
};

// Main menu buttons events
function clickDecorator(object) {
    return function() {
        page_index.style.visibility = "hidden";
        object.style.visibility = "visible";
    }
}
button_about.addEventListener('click', clickDecorator(page_about));
button_scoreboard.addEventListener('click', clickDecorator(page_scoreboard));
button_multiplayer.addEventListener('click', clickDecorator(page_multiplayer));
button_login.addEventListener('click', clickDecorator(page_login));
button_signup.addEventListener('click', clickDecorator(page_signup));
button_singleplayer.addEventListener('click', clickDecorator(page_singleplayer));
button_singleplayer.addEventListener('click', Game);

// Back to index with 'back' buttons
const buttons_back = document.getElementsByName('button_back');
for(let i = 0; i < buttons_back.length; i++) {
    buttons_back[i].addEventListener('click', function() {
        page_index.style.visibility = "visible";
        this.parentElement.style.visibility = "hidden";
    });
}
document.getElementById('back_from_game').addEventListener('click', function() {
    document.getElementById('game_container').style.visibility = "hidden";
});