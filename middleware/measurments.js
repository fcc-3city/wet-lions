const fetch = require("node-fetch");
const moment = require('moment');

function fetchMeasurments(stationId, date) {
  return Promise.all([
    fetchMeasurmentsFromSensor(stationId, "rain", date),
    fetchMeasurmentsFromSensor(stationId, "water", date),
    fetchMeasurmentsFromSensor(stationId, "winddir", date),
    fetchMeasurmentsFromSensor(stationId, "windlevel", date),
  ])
  .then(data => data)
  .then(data => console.log(data));
}

function fetchMeasurmentsFromSensor(stationId, sensor, date) {
  return fetch(`http://pomiary.gdmel.pl/rest/measurments/${stationId + 1}/${sensor}/${date}`)
    .then((res) => res.json())
    .then((json) => json['data'])
}

console.log(fetchMeasurments(0, moment().format("YYYY-MM-DD")))
