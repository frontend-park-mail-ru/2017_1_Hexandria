"use strict";

(function() {
	// Pages
	const pageIndex = document.getElementById("index");
	const pageSingleplayer = document.getElementById("singleplayer");
	const pageMultiplayer = document.getElementById("multiplayer");
	const pageAbout = document.getElementById("about");
	const pageScoreboard = document.getElementById("scoreboard");
	const pageLogin = document.getElementById("login");
	const pageSignup = document.getElementById("signup");

	// Create titles
	function titleData(string) {
		return {
			el: document.createElement("div"),
			title: string,
		};
	}
	pageSingleplayer.appendChild(new Title(titleData("Singleplayer")).el);
	pageMultiplayer.appendChild(new Title(titleData("Multiplayer")).el);
	pageAbout.appendChild(new Title(titleData("About")).el);
	pageScoreboard.appendChild(new Title(titleData("Scoreboard")).el);
	pageLogin.appendChild(new Title(titleData("Login")).el);
	pageSignup.appendChild(new Title(titleData("Signup")).el);

	// Main page elements
	const hex = new Hex({
		el: document.createElement("div"),
		data: {
			hex_title: "hexandria",
			hex_phrase: "You are the ruler.",
			controls: {
				singleplayer: {
					text: "Singleplayer",
					attrs: {
						class: "hex__singleplayer",
					},
				},
				multiplayer: {
					text: "Multiplayer",
					attrs: {
						class: "hex__multiplayer",
					},
				},
				about: {
					text: "About",
					attrs: {
						class: "hex__about",
					},
				},
				scoreboard: {
					text: "Scoreboard",
					attrs: {
						class: "hex__scoreboard",
					},
				},
			},
		},
	});
	const registerPanel = new RegisterPanel({
		el: document.createElement("div"),
		data: {
			login: {
				text: "Log In",
				attrs: {
					class: "register_panel__login",
				},
			},
			signup: {
				text: "Sign Up",
				attrs: {
					class: "register_panel__signup",
				},
			},
		},
	});
	const userPanel = new UserPanel({
		el: document.createElement("div"),
		data: {
			username: "Dolan",
		},
	});
	pageIndex.appendChild(hex.el);
	pageIndex.appendChild(registerPanel.el);
	pageIndex.appendChild(userPanel.el);

	// Hex buttons
	function hexClickDecorator(object) {
		return function() {
			pageIndex.hidden = true;
			object.hidden = false;
		};
	}
	hex.singleplayer.on("click", hexClickDecorator(pageSingleplayer));
	hex.multiplayer.on("click", hexClickDecorator(pageMultiplayer));
	hex.about.on("click", hexClickDecorator(pageAbout));
	hex.scoreboard.on("click", hexClickDecorator(pageScoreboard));

	// Game
	const gameData = {
		el: document.createElement("div"),
	};
	const game = new Game(gameData);
	pageSingleplayer.appendChild(game.el);
	console.log(pageSingleplayer.childNodes);
	hex.singleplayer.on("click", GameStart);

	// Register panel buttons
	function registerPanelClickDecorator(object) {
		return function() {
			pageIndex.hidden = true;
			object.hidden = false;
		};
	}
	registerPanel.login.on("click", registerPanelClickDecorator(pageLogin));
	registerPanel.signup.on("click", registerPanelClickDecorator(pageSignup));

	// Create back buttons
	const backButtonData = {
		text: "Back",
		attrs: {
			class: "back-button",
		},
	};
	function backButtonClickDecorator() {
		return function() {
			pageIndex.hidden = false;
			this.parentElement.hidden = true;
		};
	}
	pageSingleplayer.appendChild(new Button(backButtonData).render().on("click", backButtonClickDecorator()).el);
	pageMultiplayer.appendChild(new Button(backButtonData).render().on("click", backButtonClickDecorator()).el);
	pageAbout.appendChild(new Button(backButtonData).render().on("click", backButtonClickDecorator()).el);
	pageScoreboard.appendChild(new Button(backButtonData).render().on("click", backButtonClickDecorator()).el);
	pageLogin.appendChild(new Button(backButtonData).render().on("click", backButtonClickDecorator()).el);
	pageSignup.appendChild(new Button(backButtonData).render().on("click", backButtonClickDecorator()).el);

	// Login form
	const loginForm = new Form({
		el: document.createElement("form"),
		data: {
			controls: [
				{
					text: "Login",
				},
			],
			inputs: [
				{
					name: "login",
					type: "text",
					placeholder: "Enter Login",
				},
				{
					name: "password",
					type: "password",
					placeholder: "Enter Password",
				},
			],
		},
	});
	const fetcher = new Fetcher();
	loginForm.on("submit", (event) => {
		event.preventDefault();
		console.log("button_login click");

		const parent = loginForm.el;
		const data = {
			login: parent.login.value,
			password: parent.password.value,
		};

		fetcher.fetch("/api/login", "POST", data)
			.then((okJSON) => {
				console.log(okJSON);
				console.log(okJSON.description);
				pageLogin.hidden = true;
				pageIndex.hidden = false;
				userPanel.show();
				registerPanel.hide();
			})
			.catch(fetcher.errorCatcher);
	});
	pageLogin.appendChild(loginForm.el);

	// Login form
	const signupForm = new Form({
		el: document.createElement("form"),
		data: {
			controls: [
				{
					text: "Signup",
				},
			],
			inputs: [
				{
					name: "login",
					type: "text",
					placeholder: "Enter login",
				},
				{
					name: "email",
					type: "text",
					placeholder: "Enter e-mail",
				},
				{
					name: "password",
					type: "password",
					placeholder: "Enter password",
				},
				{
					name: "double_password",
					type: "password",
					placeholder: "Enter password second time",
				},
			],
		},
	});
	signupForm.on("submit", (event) => {
		event.preventDefault();
		console.log("button_signup click");

		const parent = signupForm.el;
		const data = {
			login: parent.login.value,
			email: parent.email.value,
			password: parent.password.value,
		};

		fetcher.fetch("/api/signup", "POST", data)
			.then((okJSON) => {
				console.log(okJSON);
				console.log(okJSON.description);
				pageSignup.hidden = true;
				pageIndex.hidden = false;
				userPanel.show();
				registerPanel.hide();
			})
			.catch(fetcher.errorCatcher);
	});
	pageSignup.appendChild(signupForm.el);

	userPanel.hide();

	pageIndex.hidden = false;
	pageSingleplayer.hidden = true;
	pageMultiplayer.hidden = true;
	pageAbout.hidden = true;
	pageScoreboard.hidden = true;
	pageLogin.hidden = true;
	pageSignup.hidden = true;

	// Autorization check on startup
	fetcher.fetch("/api/user", "GET")
		.then((okJSON) => {
			console.log(okJSON);
			console.log(okJSON.description);
			userPanel.show();
			registerPanel.hide();
		})
		.catch(fetcher.errorCatcher);

	async function animate() {
		function sleep(ms) {
			return new Promise(resolve => setTimeout(resolve, ms));
		}
		const hexElement = hex.el;
		const hexTitleElement = hexElement.querySelector(".hex__title");
		const hexMottoElement = hexElement.querySelector(".hex__motto");
		const hexButtonsElement = hexElement.querySelector(".hex__buttons");
		const registerPanelElement = registerPanel.el;
		const userPanelElement = userPanel.el;

		hexElement.style.opacity = "0";
		hexTitleElement.style.opacity = "0";
		hexMottoElement.style.opacity = "0";
		hexButtonsElement.style.opacity = "0";
		registerPanelElement.style.opacity = "0";
		userPanelElement.style.opacity = "0";

		for (let i = 0; i < 1; i += 0.01) {
			await sleep(25);
			hexElement.style.opacity = i.toString();
			hexTitleElement.style.opacity = i.toString();
		}
		for (let i = 0; i < 1; i += 0.01) {
			await sleep(25);
			hexMottoElement.style.opacity = i.toString();
		}
		for (let i = 0; i < 1; i += 0.01) {
			await sleep(25);
			registerPanelElement.style.opacity = i.toString();
			userPanelElement.style.opacity = i.toString();
			hexButtonsElement.style.opacity = i.toString();
		}
	}
	animate();
})();
