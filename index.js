const axios = require("axios");
const { reporters } = require("mocha");
require("dotenv").config();

// initialize the weatherAPI object with auth key and base url for requests
function weatherAPI(apiKey) {
  this.authKey = apiKey;
  this.baseUrl = "https://api.darksky.net";
}

// request method is passed an endpoint and a http method and builds/executes the request to the API
// and returns the JSON data to the correct method
weatherAPI.prototype.request = async function (endpoint, method, type) {
  url = this.baseUrl + endpoint; 
  try {
    const response = await axios({ method, url });
    return response.data[type];
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
  const endpoint = `/forecast/${this.authKey}/${latitude},${longitude}?exclude=flags,daily,hourly,minutely`;
  const method = "GET";
  const type = "currently";

  return this.request(endpoint, method, type);
};

weatherAPI.prototype.getWeeklyForecast = function (city, state, country) {
  const endpoint = `/forecast/${this.authKey}/${latitude},${longitude}`;
  const method = "GET";

  return this.request(endpoint, method);
};

var api = new weatherAPI(process.env.API_KEY);
api.getCurrentWeather(42.3601, -71.0589).then((data) => console.log(data));
