// Constants
const minLength = 4;
const maxLength = 10;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

const Validator = function() {
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
    this.validatePassword = function(input) {
        this.checkEmpty(input);
        this.checkMinLength(input);
        this.checkMaxLength(input);

    };
    this.validateLogin = function(input) {
        this.checkEmpty(input);
        this.checkMinLength(input);
        this.checkMaxLength(input);
    };

    this.validateAll = function(form) {
        let logins = form.getElementsByName('login');
        for (let i = 0; i < logins.length; i++) {
            this.validateLogin(logins[i]);
        }

        let emails = form.getElementsByName('email');
        for (let i = 0; i < emails.length; i++) {
            this.validateEmail(emails[i]);
        }

        let passwords = form.getElementsByName('password');
        for (let i = 0; i < passwords.length; i++) {
            this.validatePassword(passwords[i]);
        }
    };


    this.check = function(form) {
        if (arguments.length < 2) {
            return false;
        }
        //console.log(arguments.length);

        validationResult = true;
        for (var i = 1; i < arguments.length; i++) {
            //console.log(arguments[i]);

            if (arguments[i] === 'login') {
                _checkEmpty(form, arguments[i]);
            } else if (arguments[i] === 'password') {
                _checkEmpty(form, arguments[i]);
            } else if (arguments[i] === 'email') {
                _checkEmpty(form, arguments[i]);
            } else {
                return false;
            }
        }
        if (validationResult) {
            _errorMessage(form, '');
        }
        return validationResult;
    }

    let validationResult;

    function _checkEmpty(form, element) {
        if (validationResult) {
            const value = form[element].value;
            if (value && typeof value === 'string') {
                //ok
            } else {
                _errorMessage(form, 'Заполните поле ' + element);
                validationResult = false;
            }
        }
    }
    function _errorMessage(form, message) {
        let elements = form.getElementsByClassName("errors");
        if (elements.length === 0) {
            let div = document.createElement('div');
            div.className = "errors";
            div.innerHTML = message;
            form.appendChild(div);
        } else {
            elements[0].innerHTML = message;
        }
    }
}