'use strict';

const Validator = function() {
    // Constants
    const minLength = 4;
    const maxLength = 10;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

    this.checkEmpty = function(input) {
        if (!input.value || input.value === null) {
            throw new SyntaxError("empty");
        }
    };
    this.checkMinLength = function(input) {
        if (input.value.length < minLength) {
            throw new SyntaxError("too short");
        }
    };
    this.checkMaxLength = function(input) {
        if (input.value.length > maxLength) {
            throw new SyntaxError("too long");
        }
    };
    this.checkEmail = function(input) {
        if (!emailRegex.test(input.value)){
            throw new SyntaxError("not email");
        }
    };
    this.checkPassword = function(input) {
        if (!passwordRegex.test(input.value)){
            throw new SyntaxError("not password");
        }
    };

    this.validateEmail = function(input) {
        this.checkEmpty(input);
        this.checkMinLength(input);
        this.checkMaxLength(input);
        this.checkEmail(input);
    };
    this.validateLogin = function(input) {
        this.checkEmpty(input);
        this.checkMinLength(input);
        this.checkMaxLength(input);
    };
    this.validatePassword = function(input) {
        this.checkEmpty(input);
        this.checkMinLength(input);
        this.checkMaxLength(input);

    };
    this.validateDoublePasswords = function(first, second) {
        if (first.value === second.value) {
            throw new SyntaxError("not equal passwords");
        }
    };
};