# dark-sky-wrapper

This is a simple node.js wrapper for the darksky weather API.

## Usage

`npm install --save dark-sky-wrapper`

rename the .env-sample file to .env and set the api key

Initialize the library and set the api key from darksky from the

`javascript var api = new weatherAPI(process.env.API_KEY);`

Make a call for current weather for a particular place by coordinates

`javascript api.getCurrentWeather(42.3601, -71.0589).then((data) => console.log(data));`

Response:

```JSON
{
  time: 1600364674,
  summary: 'Mostly Cloudy',
  icon: 'partly-cloudy-day',
  nearestStormDistance: 11,
  nearestStormBearing: 0,
  precipIntensity: 0,
  precipProbability: 0,
  temperature: 76.44,
  apparentTemperature: 76.44,
  dewPoint: 56.01,
  humidity: 0.49,
  pressure: 1015.2,
  windSpeed: 8.24,
  windGust: 13.34,
  windBearing: 239,
  cloudCover: 0.65,
  uvIndex: 4,
  visibility: 10,
  ozone: 296.6
}
```
