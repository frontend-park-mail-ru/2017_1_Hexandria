(function() {
	"use strict";

	class Validator {
        // Constants
		constructor() {
			this.minLength = 4;
			this.maxLength = 10;
			this.emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			this.passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
		}

		checkEmpty(input) {
			if (!input.value || input.value === null) {
				throw new SyntaxError("Field is empty");
			}
		}
		checkMinLength(input) {
			if (input.value.length < this.minLength) {
				throw new SyntaxError("Enter more than 4 symbols");
			}
		}
		checkMaxLength(input) {
			if (input.value.length > this.maxLength) {
				throw new SyntaxError("Enter less than 10 symbols");
			}
		}
		checkEmail(input) {
			if (!this.emailRegex.test(input.value)) {
				throw new SyntaxError("This is not email");
			}
		}
		checkPassword(input) {
			if (!this.passwordRegex.test(input.value)) {
				throw new SyntaxError("Not a password");
			}
		}
		checkDoublePassword(input) {
			if (input.value !== input.parentElement.querySelector('input[name="password"]').value) {
				throw new SyntaxError("Passwords are not equal");
			}
		}

		validateLogin(input) {
			this.checkEmpty(input);
			this.checkMinLength(input);
			this.checkMaxLength(input);
		}
		validateEmail(input) {
			this.checkEmpty(input);
			this.checkMinLength(input);
			this.checkMaxLength(input);
			this.checkEmail(input);
		}
		validatePassword(input) {
			this.checkEmpty(input);
			this.checkMinLength(input);
			this.checkMaxLength(input);
			this.checkPassword(input);
		}
		validateDoublePasswords(input) {
			this.checkDoublePassword(input);
		}
		validate(input) {
			const name = input.getAttribute("name");
			switch (name) {
			case "login":
				this.validateLogin(input);
				break;
			case "email":
				this.validateEmail(input);
				break;
			case "password":
				this.validatePassword(input);
				break;
			case "double_password":
				this.validateDoublePasswords(input);
				break;
			}
		}
    }

	window.Validator = Validator;
})();
