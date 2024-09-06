const App = {
	init(options) {
		Telegram.WebApp.ready()
	},

	save(form, event) {
		event.preventDefault();

		var checkboxes = document.querySelectorAll("input[type=checkbox]");

		var chat_ids = []
		for (i = 0; i < checkboxes.length; ++i) {
			var checkbox = checkboxes[i] 
			if (checkbox.checked) {
				chat_ids.push(checkbox.getAttribute("chat_id"))
			}
		};

		let data = {
			"chat_ids": chat_ids
		};

		Telegram.WebApp.sendData(JSON.stringify(data));
	}
};

App.init();
