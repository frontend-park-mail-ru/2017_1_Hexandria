const Validator = function() {

    this.checkEmpty = function(input) {

    };

    this.checkLength = function(input) {

    };

    this.validateEmail = function(input) {
        this.checkEmpty(input);
    };

    this.validatePassword = function(input) {
        this.checkEmpty(input);
    };

    this.validateLogin = function(input) {
        this.checkEmpty(input);
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