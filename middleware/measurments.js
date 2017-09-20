const fetch = require("node-fetch");
const moment = require('moment');
const merge = require('merge');

function fetchMeasurments(stationId, date) {
  return Promise.all([
      fetchMeasurmentsFromSensor(stationId, "rain", date),
      fetchMeasurmentsFromSensor(stationId, "water", date),
      fetchMeasurmentsFromSensor(stationId, "windDir", date),
      fetchMeasurmentsFromSensor(stationId, "windLevel", date),
    ])
    .then(sensors => [].concat(...sensors))
    .then(data => groupByDate(data))
    .then(grouped => Object.keys(grouped).map(key => grouped[key]))
    .then(measurments => console.log(measurments))
}

function fetchMeasurmentsFromSensor(stationId, sensor, date) {
  return fetch(`http://pomiary.gdmel.pl/rest/measurments/${stationId + 1}/${sensor.toLowerCase()}/${date}`)
    .then(res => res.json())
    .then(json => json.data.map(record => ({
      "date": moment(record[0]),
      [sensor]: record[1]
    })))
    .then(data => data);
}


function groupByDate(arr) {
  let grouped = {}
  arr.forEach(elt => {
    if (elt.date.valueOf() in grouped) {
      grouped[elt.date.valueOf()] = merge(grouped[elt.date.valueOf()], elt)
    } else {
      grouped[elt.date.valueOf()] = elt
    }
  })
  return grouped
}

fetchMeasurments(0, moment().format("YYYY-MM-DD"))
