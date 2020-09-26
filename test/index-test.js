const nock = require("nock");
const expect = require("chai").expect;
const weatherAPI = require("../index.js");

const api = new weatherAPI(process.env.API_KEY, process.env.MAPQUEST_KEY);

describe("weatherAPI", () => {
  it("verifies the auth key is set upon initialization of the library", () => {
    expect(api.getAuthKey()).equals(api.authKey);
  });

  it("reset auth key", () => {
    api.setAuthKey(123456);
    expect(api.getAuthKey()).equals(123456);
  });
});

describe("current weather", () => {
  it("gets current weather from darksky when proper args are supplied", async () => {
    api.setAuthKey(process.env.API_KEY);

    nock("https://api.darksky.net")
      .get((uri) => uri.includes("forecast"))
      .reply(200, { currently: { summary: "Cloudy" } });

    const res = await api.getCurrentWeather("Boston");

    expect(res.summary).equals("Cloudy");
  });
});

describe("weekly forecast", () => {
  it("gets weekly forecast when proper args are supplied", async () => {
    nock("https://api.darksky.net")
      .get((uri) => uri.includes("forecast"))
      .reply(200, { daily: { summary: "Cloudy" } });

    const res = await api.getWeeklyForecast("Boston");
    expect(res.summary).equals("Cloudy");
  });
});
