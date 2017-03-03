'use strict';

// Pages
const page_index = document.getElementById('page_index');
const page_about = document.getElementById('page_about');
const page_scoreboard = document.getElementById('page_scoreboard');
const page_singleplayer = document.getElementById('page_singleplayer');
const page_multiplayer = document.getElementById('page_multiplayer');
const page_login = document.getElementById('page_login');
const page_signup = document.getElementById('page_signup');

window.onload = function() {
    page_about.style.visibility = "hidden";
    page_scoreboard.style.visibility = "hidden";
    page_singleplayer.style.visibility = "hidden";
    page_multiplayer.style.visibility = "hidden";
    page_login.style.visibility = "hidden";
    page_signup.style.visibility = "hidden";
    document.body.style.visibility = "visible";
    document.getElementById('registered').style.visibility = "hidden";
    // animateHex();
};

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