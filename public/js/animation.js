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

    // await sleep(4100);

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
    // // await sleep(1350);
    // for(let i = 0; i < 1; i += 0.01) {
    //     await sleep(25);
    //     motto.style.opacity = i.toString();
    // }
    //
    // // await sleep(1350);
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
// button_singleplayer.addEventListener('click', Game());
button_singleplayer.addEventListener('click', function(){
    console.log("start Game");
    Game();
});

// Back to index with 'back' buttons
let buttons_back = document.getElementsByName('button_back');
for(let i = 0; i < buttons_back.length; i++) {
    buttons_back[i].addEventListener('click', function() {
        page_index.style.visibility = "visible";
        this.parentElement.style.visibility = "hidden";
    });
}

// Input validation
let highlight = function(input) {
    input.style.border = "1px solid red";
};

document.forms["login"]["username"].addEventListener('blur', function() {
    if (!this.value || this.value === null) {
        document.getElementById('error_username').textContent = 'Enter something!';
        highlight(this);
        return;
    }
    if (!this.value.match(/^[a-zA-Z0-9]{1,10}$/)) {
        document.getElementById('error_username').textContent = 'Only latin letters and numerals!';
        highlight(this);
        return;
    }
    this.style.border = "1px solid #fff";
});

document.forms["login"]["password"].addEventListener('blur', function() {
    if (!this.value || this.value === null) {
        document.getElementById('error_password').textContent = 'Enter something!';
        highlight(this);
        return;
    }
    if (!this.value.match(/^[a-zA-Z0-9]{1,10}$/)) {
        document.getElementById('error_password').textContent = 'Only latin letters and numerals!';
        highlight(this);
        return;
    }
    if(this.value.length < 5) {
        document.getElementById('error_password').textContent = 'Enter more than 4 symbols!';
        highlight(this);
        return;
    }
    this.style.border = "1px solid #fff";
});

// Erase error
let inputs = document.forms["login"];
for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('focus', function() {
        console.log(this.nextSibling.nextSibling);
        this.nextSibling.nextSibling.textContent = '';
        this.style.border = "1px solid #eb9300";
    });
}

// Dolan is here
document.getElementById('login').addEventListener('click', function() {
    page_index.style.visibility = "inherit";
    page_login.style.visibility = "hidden";
    document.getElementById('unregistered').style.visibility = "hidden";
    document.getElementById('registered').style.visibility = "inherit";
});
