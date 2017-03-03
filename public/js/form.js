// Constants
const fetcher = new Fetcher();
const validator = new Validator();

// Design functions
const colorInputBorder = function(input, color) {
    input.style.border = `1px solid ${color}`;
};

// Validate field when blur it
const inputBlurDecorator = function(errorField, validateFunction) {
    return function() {
        try {
            validateFunction(this);
        }
        catch(err) {
            document.getElementById(errorField).textContent = err.message;
            colorInputBorder(this, "red");
            return;
        }
        colorInputBorder(this, "#fff");
    }
};

const eraseError = function(form) {
    for (let i = 0; i < form.length; i++) {
        form[i].addEventListener('focus', function() {
            this.nextSibling.nextSibling.textContent = '';
            colorInputBorder(this, "#eb9300");
        });
    }
};

(function() {
    // Constants
    const form = document.forms["form_login"];
    const login = form["login"];
    const password = form["password"];

    eraseError(form);
    login.addEventListener('blur', inputBlurDecorator('error_login', validator.validateLogin));
    password.addEventListener('blur', inputBlurDecorator('error_password', validator.validatePassword));

    // Working with server
    document.getElementById('login_submit').addEventListener('click', function() {
        console.log("button_login click");

        const parent = this.parentNode;
        const data = {
            login: parent['login'].value,
            password: parent['password'].value,
        };

        fetcher.fetch('/api/login', 'POST', data)
            .then(function(okJSON) {
                console.log(okJSON);
                console.log(okJSON.description);
            })
            .catch(errorCatcher);
    });
})();

(function() {
    // Constants
    const form = document.forms["form_signup"];
    const login = form["login"];
    const email = form["email"];
    const password = form["password"];
    const double_password = form["double_password"];

    eraseError(form);
    login.addEventListener('blur', inputBlurDecorator('error_signup_login', validator.validateLogin));
    email.addEventListener('blur', inputBlurDecorator('error_signup_email', validator.validateEmail));
    password.addEventListener('blur', inputBlurDecorator('error_signup_password', validator.validatePassword));
    double_password.addEventListener('blur',
        inputBlurDecorator('error_signup_double_password', validator.validateDoublePasswords));

    // Working with server
    document.getElementById('signup_submit').addEventListener('click', function() {
        console.log("button_login click");

        const parent = this.parentNode;
        const data = {
            login: parent['login'].value,
            password: parent['password'].value,
        };

        fetcher.fetch('/api/login', 'POST', data)
            .then(function (okJSON) {
                console.log(okJSON);
                console.log(okJSON.description);
            })
            .catch(errorCatcher);
    });
})();
