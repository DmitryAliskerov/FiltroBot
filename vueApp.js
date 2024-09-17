const vm = new Vue({
	el: '#app',
	data: {
		search: '',
		loading: true,
		status: "Loading...",
		results: []
	},
	methods: {
		save: function(e) {
			diff = this.results.filter(x => this.origin.filter(y => y[0] == x[0] && y[3] != x[3]).length != 0)

			Telegram.WebApp.sendData(
				JSON.stringify({
					"user_id": user_id,
					"chat_ids_to_delete": diff.filter(x => !x[3]).map(x => x[0]),
					"chat_ids_to_insert": diff.filter(x => x[3]).map(x => x[0])
			}))
		}
	},
	computed: {
		filteredResults() {
			return this.results.filter(item => {
				return item[2].toLowerCase().indexOf(this.search.toLowerCase()) > -1
			})
		}
	},
	mounted() {
		axios
			.get(base_url + user_id)
			.then(response => {
				this.results = response.data
				this.origin = this.results.map(a => Object.assign({}, a))
				this.loading = false
			})
			.catch(error => {
				this.status = error.message
			})
	}
});