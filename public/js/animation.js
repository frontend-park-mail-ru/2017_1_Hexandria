'use strict';

// Получаем ссылки на элементы страницы
const page_index = document.getElementById('page_index');
const page_about = document.getElementById('page_about');
const page_scoreboard = document.getElementById('page_scoreboard');

// Элементы страницы page_index
const main_hex = document.getElementById('hex');
const minor_hex = document.getElementById('hex__minor_hex');
const logo = document.getElementById('hex__title');
const motto = document.getElementById('hex__motto');
const buttons = document.getElementById('buttons');
const registration = document.getElementById('registration');
const button_about = document.getElementById('button_about');
const button_scoreboard = document.getElementById('button_scoreboard');

// Элементы страницы page_about
const button_back_from_about = document.getElementById('button_back_from_about');

// Элементы страницы page_scoreboard
const button_back_from_scoreboard = document.getElementById('button_back_from_scoreboard');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main_animation() {

    // await sleep(4100);

    main_hex.style.opacity = "0";
    logo.style.opacity = "0";
    motto.style.opacity = "0";
    buttons.style.opacity = "0";
    registration.style.opacity = "0";

    hex.hidden = false;
    minor_hex.hidden = false;
    logo.hidden = false;
    motto.hidden = false;
    buttons.hidden = false;
    registration.hidden = false;

    for(let i = 0; i < 1; i += 0.01) {
        await sleep(25);
        main_hex.style.opacity = i.toString();
        logo.style.opacity = i.toString();
    }

    // await sleep(1350);
    for(let i = 0; i < 1; i += 0.01) {
        await sleep(25);
        motto.style.opacity = i.toString();
    }

    // await sleep(1350);
    for(let i = 0; i < 1; i += 0.01) {
        await sleep(25);
        registration.style.opacity = i.toString();
        buttons.style.opacity = i.toString();
    }
}

window.onload = function() {

    // Скрываем все страницы, кроме главной
    page_about.hidden = true;
    page_scoreboard.hidden = true;

    main_animation();
};

// Добавляем обработчик события на кнопку "about"
button_about.addEventListener('click', function (event) {
    // Переключаем страницы
    page_index.hidden = true;
    page_about.hidden = false;
});

// Добавляем обработчик события на кнопку "about"
button_scoreboard.addEventListener('click', function (event) {
    // Переключаем страницы
    page_index.hidden = true;
    page_scoreboard.hidden = false;
});

// Добавляем обработчик события на кнопку "back"
button_back_from_about.addEventListener('click', function (event) {
    // Переключаем страницы
    page_index.hidden = false;
    page_about.hidden = true;
});

// Добавляем обработчик события на кнопку "back"
button_back_from_scoreboard.addEventListener('click', function (event) {
    // Переключаем страницы
    page_index.hidden = false;
    page_scoreboard.hidden = true;
});