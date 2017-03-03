// Main menu buttons
const hex = document.getElementById('hex');
const button_about = document.getElementById('button_about');
const button_scoreboard = document.getElementById('button_scoreboard');
const button_singleplayer = document.getElementById('button_singleplayer');
const button_multiplayer = document.getElementById('button_multiplayer');
const button_login = document.getElementById('button_login');
const button_signup = document.getElementById('button_signup');

// Main menu buttons events
function clickDecorator(object) {
    return function() {
        hex.parentElement.style.visibility = "hidden";
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

// Hex animate
function animateHex() {

}