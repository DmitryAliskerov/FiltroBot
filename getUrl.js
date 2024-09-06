const currentQuery = new URLSearchParams(document.location.search);

const url = "http://localhost:5000/user_channels/" + currentQuery.get("user_id")
