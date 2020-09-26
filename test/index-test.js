const nock = require("nock");
const expect = require("chai").expect;
const weatherAPI = require("../index.js");

const api = new weatherAPI("secret key", "secret key");

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
    nock("https://www.mapquestapi.com")
      .get((uri) => uri.includes("geocoding"))
      .reply(200, {
        results: [
          {
            providedLocation: {
              location: "02210",
            },
            locations: [
              {
                latLng: {
                  lat: 42.347701,
                  lng: -71.042779,
                },
                displayLatLng: {
                  lat: 42.347701,
                  lng: -71.042779,
                },
              },
            ],
          },
        ],
      });

    nock("https://api.darksky.net")
      .get((uri) => uri.includes("forecast"))
      .reply(200, { currently: { summary: "Cloudy" } });

    const res = await api.getCurrentWeather("Boston");

    expect(res.summary).equals("Cloudy");
  });
});

describe("weekly forecast", () => {
  it("gets weekly forecast when proper args are supplied", async () => {
    nock("https://www.mapquestapi.com")
      .get((uri) => uri.includes("geocoding"))
      .reply(200, {
        results: [
          {
            providedLocation: {
              location: "02210",
            },
            locations: [
              {
                latLng: {
                  lat: 42.347701,
                  lng: -71.042779,
                },
                displayLatLng: {
                  lat: 42.347701,
                  lng: -71.042779,
                },
              },
            ],
          },
        ],
      });

    nock("https://api.darksky.net")
      .get((uri) => uri.includes("forecast"))
      .reply(200, { daily: { summary: "Cloudy" } });

    const res = await api.getWeeklyForecast("Boston");
    expect(res.summary).equals("Cloudy");
  });
});

describe("geocoding api takes in a location and returns decimal coordinates", () => {
  it("city name", async () => {
    nock("https://www.mapquestapi.com")
      .get((uri) => uri.includes("geocoding"))
      .reply(200, {
        info: {
          statuscode: 0,
          copyright: {
            text: "© 2020 MapQuest, Inc.",
            imageUrl: "http://api.mqcdn.com/res/mqlogo.gif",
            imageAltText: "© 2020 MapQuest, Inc.",
          },
          messages: [],
        },
        options: {
          maxResults: -1,
          thumbMaps: true,
          ignoreLatLngInput: false,
        },
        results: [
          {
            providedLocation: {
              location: "02210",
            },
            locations: [
              {
                street: "",
                adminArea6: "",
                adminArea6Type: "Neighborhood",
                adminArea5: "Boston",
                adminArea5Type: "City",
                adminArea4: "Suffolk County",
                adminArea4Type: "County",
                adminArea3: "MA",
                adminArea3Type: "State",
                adminArea1: "US",
                adminArea1Type: "Country",
                postalCode: "02210",
                geocodeQualityCode: "Z1XAA",
                geocodeQuality: "ZIP",
                dragPoint: false,
                sideOfStreet: "N",
                linkId: "286267732",
                unknownInput: "",
                type: "s",
                latLng: {
                  lat: 42.347701,
                  lng: -71.042779,
                },
                displayLatLng: {
                  lat: 42.347701,
                  lng: -71.042779,
                },
              },
            ],
          },
        ],
      });

    const response = await api.geocode("Boston");

    expect(response).to.eql({ lat: 42.347701, lng: -71.042779 });
  });
  it("postal code", async () => {
    nock("https://www.mapquestapi.com")
      .get((uri) => uri.includes("geocoding"))
      .reply(200, {
        info: {
          statuscode: 0,
          copyright: {
            text: "© 2020 MapQuest, Inc.",
            imageUrl: "http://api.mqcdn.com/res/mqlogo.gif",
            imageAltText: "© 2020 MapQuest, Inc.",
          },
          messages: [],
        },
        options: {
          maxResults: -1,
          thumbMaps: true,
          ignoreLatLngInput: false,
        },
        results: [
          {
            providedLocation: {
              location: "01748",
            },
            locations: [
              {
                street: "",
                adminArea6: "",
                adminArea6Type: "Neighborhood",
                adminArea5: "Hopkinton",
                adminArea5Type: "City",
                adminArea4: "Middlesex County",
                adminArea4Type: "County",
                adminArea3: "MA",
                adminArea3Type: "State",
                adminArea1: "US",
                adminArea1Type: "Country",
                postalCode: "01748",
                geocodeQualityCode: "Z1XAA",
                geocodeQuality: "ZIP",
                dragPoint: false,
                sideOfStreet: "N",
                linkId: "286267528",
                unknownInput: "",
                type: "s",
                latLng: {
                  lat: 42.224925,
                  lng: -71.537489,
                },
                displayLatLng: {
                  lat: 42.224925,
                  lng: -71.537489,
                },
                mapUrl:
                  "http://www.mapquestapi.com/staticmap/v5/map?key=ErQs2FPySv8WJ41AH53bqNBGake1iVRW&type=map&size=225,160&locations=42.224925,-71.537489|marker-sm-50318A-1&scalebar=true&zoom=15&rand=-548647241",
              },
            ],
          },
        ],
      });

    const response = await api.geocode("01746");

    expect(response).to.eql({
      lat: 42.224925,
      lng: -71.537489,
    });
  });
  it("full address", async () => {
    nock("https://www.mapquestapi.com")
      .get((uri) => uri.includes("geocoding"))
      .reply(200, {
        info: {
          statuscode: 0,
          copyright: {
            text: "© 2020 MapQuest, Inc.",
            imageUrl: "http://api.mqcdn.com/res/mqlogo.gif",
            imageAltText: "© 2020 MapQuest, Inc.",
          },
          messages: [],
        },
        options: {
          maxResults: -1,
          thumbMaps: true,
          ignoreLatLngInput: false,
        },
        results: [
          {
            providedLocation: {
              location: "100 state street framingham MA",
            },
            locations: [
              {
                street: "100 State St",
                adminArea6: "",
                adminArea6Type: "Neighborhood",
                adminArea5: "Framingham",
                adminArea5Type: "City",
                adminArea4: "Middlesex",
                adminArea4Type: "County",
                adminArea3: "MA",
                adminArea3Type: "State",
                adminArea1: "US",
                adminArea1Type: "Country",
                postalCode: "01702-2499",
                geocodeQualityCode: "P1AAA",
                geocodeQuality: "POINT",
                dragPoint: false,
                sideOfStreet: "L",
                linkId: "r21497489|p73739612|n28635621",
                unknownInput: "",
                type: "s",
                latLng: {
                  lat: 42.297814,
                  lng: -71.437214,
                },
                displayLatLng: {
                  lat: 42.297813,
                  lng: -71.435685,
                },
                mapUrl:
                  "http://www.mapquestapi.com/staticmap/v5/map?key=ErQs2FPySv8WJ41AH53bqNBGake1iVRW&type=map&size=225,160&locations=42.297814,-71.437214|marker-sm-50318A-1&scalebar=true&zoom=15&rand=214459243",
              },
            ],
          },
        ],
      });

    const response = await api.geocode("100 State St. Framingham, MA 01701");
    expect(response).to.eql({
      lat: 42.297814,
      lng: -71.437214,
    });
  });
});
