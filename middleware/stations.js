const fetch = require("node-fetch");

function fetchStations() {
  return fetch('http://pomiary.gdmel.pl/rest/stations')
    .then(res => res.json())
    .then(json => json.data)
    .then(result => result.map(station => stationToModel(station)));
}

function stationToModel(data) {
  return {
    id: data.no - 1,
    externalId: data.no,
    name: data.name,
    active: data.active,
    sensors: {
      rain: data.rain,
      water: data.water,
      windDir: data.winddir,
      windLevel: data.windlevel
    }
  };
}

exports.fetchStations = fetchStations;
