const vm = new Vue({
	el: '#app',
	data: {
		loading: true,
		status: "Loading...",
		results: []
	},
	methods: {
		save: function(e) {
			e.preventDefault()
			Telegram.WebApp.sendData(
				JSON.stringify({
					"user_id": user_id,
					"chat_ids": this.results.filter(x => x[3]).map(x => x[0])
			}))
		}
	},
	mounted() {
		axios
			.get(base_url + user_id)
			.then(response => {
				this.results = response.data
				this.loading = false
			})
			.catch(error => {
				this.status = error.message
			})
	}
});