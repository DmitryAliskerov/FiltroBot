const vm = new Vue({
	el: '#app',
	data: {
		loading: true,
		results: []
	},
	mounted() {
		axios.get(url).then(response => {
			this.results = response.data
			this.loading = false
		})
	}
});