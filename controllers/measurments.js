const fetch = require('node-fetch')
const moment = require('moment')
const merge = require('merge')

function sanitize (elt) {
  values = Object.keys(elt).map(key => elt[key])
  return !(values.every(value => value >= 3800 || value === null))
}

// expects stationId as number and date as moment.js object
function fetchMeasurments (stationId, date) {
  const dateStr = date.format('YYYY-MM-DD')
  return Promise.all([
    _fetchMeasurmentsFromSensor(stationId, 'rain', dateStr),
    _fetchMeasurmentsFromSensor(stationId, 'water', dateStr),
    _fetchMeasurmentsFromSensor(stationId, 'windDir', dateStr),
    _fetchMeasurmentsFromSensor(stationId, 'windLevel', dateStr)
  ])
    .then(sensors => [].concat(...sensors))
    .then(data => data.filter(elt => sanitize(elt)))
    .then(data => groupByDate(data, stationId))
}

function _fetchMeasurmentsFromSensor (stationId, sensor, date) {
  return fetch(`http://pomiary.gdmel.pl/rest/measurments/${stationId}/${sensor.toLowerCase()}/${date}`)
    .then(res => res.json())
    .then(json => json.data.map(record => ({
      'date': moment(record[0]),
      [sensor]: record[1]
    })))
    .then(data => data)
}

function groupByDate (arr, stationId) {
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

module.exports = fetchMeasurments
