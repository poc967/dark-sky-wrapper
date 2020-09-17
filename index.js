const axios = require("axios");
require("dotenv").config();

// initialize the weatherAPI object with auth key and base url for requests
function weatherAPI(apiKey) {
  this.authKey = apiKey;
  this.baseUrl = "https://api.darksky.net";
}

// request method is passed an endpoint and a http method and builds/executes the request to the API
// and returns the JSON data to the correct method
weatherAPI.prototype.request = async function (args) {
  url = this.baseUrl + args.endpoint;
  const { method } = args;
  try {
    const response = await axios({ method, url });
    return response.data[args.type];
  } catch (error) {
    console.log(error);
  }
};

weatherAPI.prototype.getAuthKey = function () {
  return this.authKey;
};

weatherAPI.prototype.setAuthKey = function (apiKey) {
  this.authKey = apiKey;
};

weatherAPI.prototype.getCurrentWeather = function (latitude, longitude) {
  const args = {
    endpoint: `/forecast/${this.authKey}/${latitude},${longitude}?exclude=flags,daily,hourly,minutely`,
    method: "GET",
    type: "currently",
  };

  return this.request(args);
};

weatherAPI.prototype.getWeeklyForecast = function (latitude, longitude) {
  args = {
    endpoint: `/forecast/${this.authKey}/${latitude},${longitude}?exclude=currently,hourly,minutely,flags`,
    method: "GET",
    type: "daily",
  };

  return this.request(args);
};

var api = new weatherAPI(process.env.API_KEY);
api.getWeatherAlerts(42.3601, -71.0589).then((data) => console.log(data));
