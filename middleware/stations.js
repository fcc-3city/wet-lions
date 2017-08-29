const fetch = require("node-fetch");

function unenvelope(envelope) {
  return envelope['data']
}

function fetchStations(callback) {

  fetch('http://pomiary.gdmel.pl/rest/stations')
    .then((res) => res.json())
    .then((json) => {
      // console.log(json);

      return json;
    }).then((json) => {
      const data = unenvelope(json);
      return data
    }).then((result) => {
      // console.log(result);
      for(item of result) {
        // console.log(item);
        const blargh = callback(item)
        // console.log(blargh);
      }
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

// const data = fetchStations(stationsToModel);
// console.log(data);
