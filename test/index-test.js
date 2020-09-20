const nock = require("nock");
const expect = require("chai").expect;
const weatherAPI = require("../index.js");

const api = new weatherAPI(process.env.API_KEY);

describe("weatherAPI", () => {
  it("verifies the auth key is set upon initialization of the library", () => {
    expect(api.getAuthKey()).equals(process.env.API_KEY);
  });

  it("reset auth key", () => {
    api.setAuthKey(123456);
    expect(api.getAuthKey()).equals(123456);
  });
});

describe("current weather", () => {
  it("gets current weather from darksky when proper args are supplied", async () => {
    const latitude = 42.2287;
    const longitude = -71.5226;

    api.setAuthKey(process.env.API_KEY);

    nock("https://api.darksky.net")
      .get(
        `/forecast/${process.env.API_KEY}/${latitude},${longitude}?exclude=flags,daily,hourly,minutely`
      )
      .reply(200, { currently: { summary: "Cloudy" } });

    const res = await api.getCurrentWeather(latitude, longitude);

    expect(res.summary).equals("Cloudy");
  });
});

describe("weekly forecast", () => {
  it("gets weekly forecast when proper args are supplied", async () => {
    const latitude = 42.2287;
    const longitude = -71.5226;

    nock("https://api.darksky.net")
      .get(
        `/forecast/${process.env.API_KEY}/${latitude},${longitude}?exclude=currently,hourly,minutely,flags`
      )
      .reply(200, { daily: { summary: "Cloudy" } });

    const res = await api.getWeeklyForecast(latitude, longitude);
    expect(res.summary).equals("Cloudy");
  });
});
