'use strict';

const Validator = function() {
    // Constants
    const minLength = 4;
    const maxLength = 10;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;

    const checkEmpty = function(input) {
        if (!input.value || input.value === null) {
            throw new SyntaxError("Field is empty");
        }
    };
    const checkMinLength = function(input) {
        if (input.value.length < minLength) {
            throw new SyntaxError("Enter more than 4 symbols");
        }
    };
    const checkMaxLength = function(input) {
        if (input.value.length > maxLength) {
            throw new SyntaxError("Enter less than 10 symbols");
        }
    };
    const checkEmail = function(input) {
        if (!emailRegex.test(input.value)){
            throw new SyntaxError("This is not email");
        }
    };
    const checkPassword = function(input) {
        if (!passwordRegex.test(input.value)){
            throw new SyntaxError("Passwords do not match");
        }
    };
    const checkDoublePassword = function(input) {
        console.log(input.value);
        console.log(input.parentElement['password'].value);
        if (input.value !== input.parentElement['password'].value) {
            throw new SyntaxError("Passwords are not equal");
        }
    };

    this.validateEmail = function(input) {
        checkEmpty(input);
        checkMinLength(input);
        checkMaxLength(input);
        checkEmail(input);
    };
    this.validateLogin = function(input) {
        checkEmpty(input);
        checkMinLength(input);
        checkMaxLength(input);
    };
    this.validatePassword = function(input) {
        checkEmpty(input);
        checkMinLength(input);
        checkMaxLength(input);
    };
    this.validateDoublePasswords = function(input) {
        checkDoublePassword(input);
    };
};