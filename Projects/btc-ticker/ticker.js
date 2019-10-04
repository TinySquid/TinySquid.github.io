//ENDPOINT: https://api.coindesk.com/v1/bpi/currentprice.json

axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
  .then(response => {
    console.log(response);

    //No need to show us the value past 1 cent
    const priceUSD = response.data.bpi.USD.rate.substring(0, response.data.bpi.USD.rate.length - 2);

    //Parse time from API into Date object
    let updateTime = new Date(response.data.time.updated);

    //Format for displaying time
    let timeOptions = {
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      seconds: 'numeric',
      hour12: true
    };

    //Set time with our options
    updateTime = updateTime.toLocaleString('en-US', timeOptions)

    //Get price element, set text with data from API.
    const price = document.querySelector('.price');
    price.textContent = `$${priceUSD} USD`;

    //Get lastUpdate element, set text with data from API.
    const lastUpdate = document.querySelector('.last-update');
    lastUpdate.textContent = `${updateTime}`;

  })
  .catch(error => console.log(error));