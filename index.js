const axios = require("axios");
require("dotenv").config();
axios.defaults.adapter = require("axios/lib/adapters/http");

// initialize the weatherAPI object with auth key and base url for requests
function weatherAPI(apiKey, mapquestKey) {
  this.authKey = apiKey;
  this.mapquestKey = mapquestKey;
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

weatherAPI.prototype.geocode = async function (location) {
  try {
    const decimalCoordinates = await axios.get(
      `http://www.mapquestapi.com/geocoding/v1/address?key=${this.mapquestKey}&location=${location}`
    );
    return decimalCoordinates.data.results[0].locations[0].latLng;
  } catch (error) {}
};

weatherAPI.prototype.getAuthKey = function () {
  return this.authKey;
};

weatherAPI.prototype.setAuthKey = function (apiKey) {
  this.authKey = apiKey;
};

weatherAPI.prototype.getCurrentWeather = async function (location) {
  const data = await this.geocode(location);

  if (data) {
    const args = {
      endpoint: `/forecast/${this.authKey}/${data.lat},${data.lng}?exclude=flags,daily,hourly,minutely`,
      method: "GET",
      type: "currently",
    };

    return this.request(args);
  } else {
    throw new Error("The provided location could not be geocoded");
  }
};

weatherAPI.prototype.getWeeklyForecast = async function (location) {
  const data = await this.geocode(location);

  if (data) {
    args = {
      endpoint: `/forecast/${this.authKey}/${data.lat},${data.lng}?exclude=currently,hourly,minutely,flags`,
      method: "GET",
      type: "daily",
    };

    return this.request(args);
  } else {
    throw new Error("The provided location could not be geocoded");
  }
};

module.exports = weatherAPI;
