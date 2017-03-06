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
	let gameData = {
		el: document.createElement("div"),
	};
	pageSingleplayer.appendChild(new Game(gameData).el);
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
	const backAbout = new Button(backButtonData).render();
	const backScoreboard = new Button(backButtonData).render();
	const backLogin = new Button(backButtonData).render();
	const backSignup = new Button(backButtonData).render();
	pageAbout.appendChild(backAbout.el);
	pageScoreboard.appendChild(backScoreboard.el);
	pageLogin.appendChild(backLogin.el);
	pageSignup.appendChild(backSignup.el);
	function backButtonClickDecorator() {
		return function() {
			pageIndex.hidden = false;
			console.log(this);
			this.parentElement.hidden = true;
		};
	}
	backAbout.on("click", backButtonClickDecorator());
	backScoreboard.on("click", backButtonClickDecorator());
	backLogin.on("click", backButtonClickDecorator());
	backSignup.on("click", backButtonClickDecorator());

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
		console.log("button_login click");

		const parent = signupForm.el;
		const data = {
			login: parent.login.value,
			email: parent.email.value,
			password: parent.password.value,
		};

		fetcher.fetch("/api/login", "POST", data)
			.then((okJSON) => {
				console.log(okJSON);
				console.log(okJSON.description);
			})
			.catch(fetcher.errorCatcher);
	});
	pageSignup.appendChild(signupForm.el);

	userPanel.hidden = true;
	pageIndex.hidden = false;
	pageSingleplayer.hidden = true;
	pageMultiplayer.hidden = true;
	pageAbout.hidden = true;
	pageScoreboard.hidden = true;
	pageLogin.hidden = true;
	pageSignup.hidden = true;
})();
