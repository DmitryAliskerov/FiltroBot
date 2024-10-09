const vm = new Vue({
	el: '#app',
	data: {
		search: '',
		loading: true,
		status: "Loading...",
		results: [],
		sortOptions: [
			{id: 0, val: "Время"},
			{id: 1, val: "Канал -> Время"},
			{id: 2, val: "Канал -> Тема -> Время"},
			{id: 3, val: "Тема -> Время"},
			{id: 4, val: "Тема -> Канал -> Время"},
		],
		selectedSortOption: 0
	},
	methods: {
		save: function(e) {
			diff = this.results.filter(x => this.origin.filter(y => y[0] == x[0] && y[3] != x[3]).length != 0)

			Telegram.WebApp.sendData(
				JSON.stringify({
					"user_id": user_id,
					"chat_ids_to_delete": diff.filter(x => !x[3]).map(x => x[0]),
					"chat_ids_to_insert": diff.filter(x => x[3]).map(x => x[0]),
					"sort_option": this.selectedSortOption,
					"tz_offset": new Date().getTimezoneOffset()
			}))
		}
	},
	computed: {
		filteredResults() {
			var filteredData = this.results.filter(item => {
				return item[2].toLowerCase().indexOf(this.search.toLowerCase()) > -1
			})

			return _(filteredData).groupBy(x => x[5]).map((value, key) => ({"theme": key, "chats": value})).value()
		}
	},
	mounted() {
		axios
			.get(base_url + user_id)
			.then(response => {
				this.results = response.data.chats
				this.origin = this.results.map(a => Object.assign({}, a))
				this.selectedSortOption = response.data.sortOption[0]
				this.loading = false
			})
			.catch(error => {
				this.status = error.message
			})
	}
});