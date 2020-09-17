# dark-sky-wrapper
This is a simple node.js wrapper for the darksky weather API. 

## Usage

```npm install --save dark-sky-wrapper```

rename the .env-sample file to .env and set the api key 

Initialize the library and set the api key from darksky from the

```var api = new weatherAPI(process.env.API_KEY);```

Make a call for current weather for a particular place by coordinates

```api.getCurrentWeather(42.3601, -71.0589).then((data) => console.log(data));```

Response:

```



