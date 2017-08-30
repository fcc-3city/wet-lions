const fetch = require("node-fetch");

function unenvelope(envelope) {
  return envelope['data']
}

function fetchStations() {
  return fetch('http://pomiary.gdmel.pl/rest/stations')
    .then((res) => res.json())
    .then((json) => unenvelope(json))
    .then((result) => {
      let list = []

      for(item of result) {
        list.push(stationsToModel(item))
      }

      return list
    });
}

function stationsToModel(data) {
  const result = {
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
  }
  return result
}

// TODO: Better way to export?
// module.exports = fetchStations;
exports.fetchStations = fetchStations;

// NOTE: Test
// const data = fetchStations().then((list) => {
//   console.log(list);
// })
