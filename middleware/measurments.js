const fetch = require("node-fetch");
const moment = require('moment');
const merge = require('merge')

function fetchMeasurments(stationId, date) {
  return Promise.all([
    fetchMeasurmentsFromSensor(stationId, "rain", date),
    fetchMeasurmentsFromSensor(stationId, "water", date),
    fetchMeasurmentsFromSensor(stationId, "windDir", date),
    fetchMeasurmentsFromSensor(stationId, "windLevel", date),
  ])
  .then(list => merge(...list))
  .then(data => console.log(data));
}

function fetchMeasurmentsFromSensor(stationId, sensor, date) {
  return fetch(`http://pomiary.gdmel.pl/rest/measurments/${stationId + 1}/${sensor.toLowerCase()}/${date}`)
    .then((res) => res.json())
    .then((json) => {
      data = {};
      data[sensor] = json['data'];
      return data;
    })
    // .then(data => console.log(data));
}

fetchMeasurments(0, moment().format("YYYY-MM-DD"))
