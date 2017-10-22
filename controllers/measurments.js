const fetch = require('node-fetch');
const moment = require('moment');
const merge = require('merge');

function sanitize(elt) {
  console.log(elt)
  values = Object.keys(elt).map(key => elt[key])
  return !(values.every(value => value >= 3999 || value === null))
}

// expects stationId as number and date as moment.js object
function fetchMeasurments(stationId, date) {
  const dateStr = date.format("YYYY-MM-DD")
  return Promise.all([
      fetchMeasurmentsFromSensor(stationId, "rain", dateStr),
      fetchMeasurmentsFromSensor(stationId, "water", dateStr),
      fetchMeasurmentsFromSensor(stationId, "windDir", dateStr),
      fetchMeasurmentsFromSensor(stationId, "windLevel", dateStr),
    ])
    .then(sensors => [].concat(...sensors))
    .then(data => data.filter(elt => sanitize(elt)))
    .then(data => groupByDate(data, stationId))
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


function groupByDate(arr, stationId) {
  let grouped = {}
  arr.forEach(elt => {
    if (elt.date.valueOf() in grouped) {
      grouped[elt.date.valueOf()] = merge(grouped[elt.date.valueOf()], elt)
    } else {
      grouped[elt.date.valueOf()] = merge({stationId}, elt)
    }
  })
  return Object.keys(grouped).map(key => grouped[key])
}

module.exports = fetchMeasurments;
