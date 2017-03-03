// Constants
const minInputLength = 6;
const maxInputLength = 10;

const fetcher = new Fetcher();

const colorInputBorder = function(input, color) {
    input.style.border = `1px solid ${color}`;
};

document.forms["form_login"]["username"].addEventListener('blur', function() {
    if (!this.value || this.value === null) {
        document.getElementById('error_username').textContent = 'Enter something!';
        colorInputBorder(this, "red");
        return;
    }
    if (!this.value.match(/^[a-zA-Z0-9]{1,10}$/)) {
        document.getElementById('error_username').textContent = 'Only latin letters and numerals!';
        colorInputBorder(this, "red");
        return;
    }
    colorInputBorder(this, "#fff");
});


document.forms["form_login"]["password"].addEventListener('blur', function() {
    if (!this.value || this.value === null) {
        document.getElementById('error_password').textContent = 'Enter something!';
        colorInputBorder(this, "red");
        return;
    }
    if (!this.value.match(/^[a-zA-Z0-9]{1,10}$/)) {
        document.getElementById('error_password').textContent = 'Only latin letters and numerals!';
        colorInputBorder(this, red);
        return;
    }
    if(this.value.length < 5) {
        document.getElementById('error_password').textContent = 'Enter more than 4 symbols!';
        colorInputBorder(this, "red");
        return;
    }
    colorInputBorder(this, "#fff");
});

// Erase error
const inputs = document.forms["form_login"];
for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('focus', function() {
        console.log(this.nextSibling.nextSibling);
        this.nextSibling.nextSibling.textContent = '';
        colorInputBorder(this, "#eb9300");
    });
}

document.getElementById('login_submit').addEventListener('click', function() {
    console.log("button_login click");

    const parent = this.parentNode;
    const data = {
        login: parent['username'].value,
        password: parent['password'].value,
    };

    fetcher.fetch('/api/login', 'POST', data)
        .then(function(okJSON) {
            console.log(okJSON);
            console.log(okJSON.description);
        })
        .catch(errorCatcher);
});

// Input validation

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
