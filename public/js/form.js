// Constants
const fetcher = new Fetcher();
const validator = new Validator();

// Design functions
const colorInputBorder = function(input, color) {
    input.style.border = `1px solid ${color}`;
};

(function() {
    // Constants
    const form = document.forms["form_login"];
    const login = form["login"];
    const password = form["password"];
    const error_login = document.getElementById('error_login');

    // Erase error
    for (let i = 0; i < form.length; i++) {
        form[i].addEventListener('focus', function() {
            this.nextSibling.nextSibling.textContent = '';
            colorInputBorder(this, "#eb9300");
        });
    }

    function inputBlurDecorator(errorField, validateFunction) {
        return function() {
            try {
                validateFunction(this);
            }
            catch(err) {
                console.log(err);
                document.getElementById(errorField).textContent = err.name;
                colorInputBorder(this, "red");
                return;
            }
            colorInputBorder(this, "#fff");
        }
    }
    login.addEventListener('blur', inputBlurDecorator('error_login', validator.validateLogin));

    password.addEventListener('blur', function() {
        try {
            validator.validateLogin(this);
        }
        catch(err) {
            document.getElementById('error_login').textContent = err.name;
            colorInputBorder(this, "red");
            return;
        }
        colorInputBorder(this, "#fff");
        colorInputBorder(this, "#fff");
    });

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

// Dolan is here
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
