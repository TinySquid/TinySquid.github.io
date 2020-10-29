// Get price data from the coindesk API and update the ticker every 5 minutes
// First call before interval setup to get initial data
updateTicker();

setInterval(() => {
	updateTicker();
}, 300000);

function updateTicker() {
	// Using Coindesk API to get BTC value in USD. Updated usually every 5 minutes.
	//ENDPOINT: https://api.coindesk.com/v1/bpi/currentprice.json
	axios
		.get("https://api.coindesk.com/v1/bpi/currentprice.json")
		.then((response) => {
			//No need to show us the value past 1 cent
			const priceUSD = response.data.bpi.USD.rate.substring(
				0,
				response.data.bpi.USD.rate.length - 2
			);

			//Parse time from API into Date object
			let updateTime = new Date(response.data.time.updated);

			//Format for displaying time
			let timeOptions = {
				month: "2-digit",
				day: "2-digit",
				hour: "numeric",
				minute: "numeric",
				seconds: "numeric",
				hour12: true,
			};

			//Set time with our options
			updateTime = updateTime.toLocaleString("en-US", timeOptions);

			//Get price element, set text with data from API.
			const price = document.querySelector(".price");
			price.textContent = `$${priceUSD} USD`;

			//Get lastUpdate element, set text with data from API.
			const lastUpdate = document.querySelector(".last-update");
			lastUpdate.textContent = `${updateTime}`;
		})
		.catch((error) => {
			alert(
				"Error: Could not retrieve price data for bitcoin. Coindesk API might be down."
			);
			console.log(error);
		});
}
