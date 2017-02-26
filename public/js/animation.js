'use strict';

// Получаем ссылки на элементы страницы
const page_index = document.getElementById('page_index');
const page_about = document.getElementById('page_about');
const page_scoreboard = document.getElementById('page_scoreboard');
const page_singleplayer = document.getElementById('page_singleplayer');
const page_multiplayer = document.getElementById('page_multiplayer');
const page_login = document.getElementById('page_login');
const page_signup = document.getElementById('page_signup');

// Элементы страницы page_index
const main_hex = document.getElementById('hex');
const minor_hex = document.getElementById('minor_hex');
const logo = document.getElementById('hex__title');
const motto = document.getElementById('hex__motto');
const buttons = document.getElementById('buttons');
const registration = document.getElementById('registration');
const button_about = document.getElementById('button_about');
const button_scoreboard = document.getElementById('button_scoreboard');
const button_singleplayer = document.getElementById('button_singleplayer');
const button_multiplayer = document.getElementById('button_multiplayer');
const button_login = document.getElementById('button_login');
const button_signup = document.getElementById('button_signup');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function main_animation() {
    console.log('tuduuuu');

    // await sleep(4100);

    // main_hex.style.opacity = "0";
    // logo.style.opacity = "0";
    // motto.style.opacity = "0";
    // buttons.style.opacity = "0";
    // registration.style.opacity = "0";

    hex.hidden = false;
    logo.hidden = false;
    motto.hidden = false;
    buttons.hidden = false;
    registration.hidden = false;
    document.getElementById('registered').hidden = true;



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
}

window.onload = function() {

    // Скрываем все страницы, кроме главной
    page_about.hidden = true;
    page_scoreboard.hidden = true;

    main_animation();
};

// Обработчики событий на кнопки главного меню
button_about.addEventListener('click', function (event) {
    page_index.hidden = true;
    page_about.hidden = false;
});

button_scoreboard.addEventListener('click', function() {
    page_index.hidden = true;
    page_scoreboard.hidden = false;
});

button_singleplayer.addEventListener('click', function() {
    page_index.hidden = true;
    page_singleplayer.hidden = false;
    game();
});

button_multiplayer.addEventListener('click', function() {
    page_index.hidden = true;
    page_multiplayer.hidden = false;
});

button_login.addEventListener('click', function() {
    page_index.hidden = true;
    page_login.hidden = false;
});

button_signup.addEventListener('click', function (event) {
    page_index.hidden = true;
    page_signup.hidden = false;
});

// Добавляем обработчик события на кнопки "back"
let buttons_back = document.getElementsByName('button_back');
for(let i = 0; i < buttons_back.length; i++) {
    buttons_back[i].addEventListener('click', function() {
        page_index.hidden = false;
        this.parentElement.hidden = true;
    });
}

// Валидация инпутов
document.forms["login"]["username"].addEventListener('blur', function() {
    if (!this.value || this.value === null) {
        document.getElementById('error_username').textContent = 'Enter something!';
        return;
    }
    if (!this.value.match(/^[a-zA-Z0-9]{1,10}$/)) {
        document.getElementById('error_username').textContent = 'Only latin letters and numerals!';
    }
});

document.forms["login"]["password"].addEventListener('blur', function() {
    if (!this.value || this.value === null) {
        document.getElementById('error_password').textContent = 'Enter something!';
        return;
    }
    if (!this.value.match(/^[a-zA-Z0-9]{1,10}$/)) {
        document.getElementById('error_password').textContent = 'Only latin letters and numerals!';
        return;
    }
    if(this.value.length < 5) {
        document.getElementById('error_password').textContent = 'Enter more than 4 symbols!';
    }
});

// Erase error
document.forms["login"]["username"].addEventListener('focus', function() {
    let errorField = document.getElementById('error_username');
    errorField.textContent = '';
});

document.forms["login"]["password"].addEventListener('focus', function() {
    let errorField = document.getElementById('error_password');
    errorField.textContent = '';
});

// Dolan is here
document.getElementById('login').addEventListener('click', function() {
    page_index.hidden = false;
    page_login.hidden = true;
    document.getElementById('unregistered').hidden = true;
    document.getElementById('registered').hidden = false;
});