const axios = require('axios')
const moment = require('moment')
const merge = require('merge')
const flatten = array => [].concat(...array)
const defaultError = require('../utility/defaultError')

const cache = require('memory-cache')

function sanitize (elt) {
  return !(Object.keys(elt)
    .map(key => elt[key])
    .every(value => value >= 3800 || value === null))
}

// expects stationId as number and date as moment.js object
function fetchMeasurments (stationId, date) {
  const dateStr = date.format('YYYY-MM-DD')
  const key = `${stationId}/${dateStr}`

  const cached = cache.get(key)
  // console.log(key, cached !== null, cache.memsize())
  return cached !== null ? Promise.resolve(cached) : Promise.all([
    _fetchMeasurmentsFromSensor(stationId, 'rain', dateStr),
    _fetchMeasurmentsFromSensor(stationId, 'water', dateStr),
    _fetchMeasurmentsFromSensor(stationId, 'windDir', dateStr),
    _fetchMeasurmentsFromSensor(stationId, 'windLevel', dateStr)
  ])
    .then(sensors => flatten(sensors))
    .then(data => data.filter(elt => sanitize(elt)))
    .then(data => groupByDate(data, stationId))
    .then(data => {
      cache.put(key, data, 100000)
      return data
    })
}

function _fetchMeasurmentsFromSensor (stationId, sensor, date) {
  return axios.get(`http://pomiary.gdmel.pl/rest/measurments/${stationId}/${sensor.toLowerCase()}/${date}`)
    .then(res => res.data)
    .then(json => json.data.map(record => ({
      'date': moment(record[0]),
      [sensor]: record[1]
    })))
    .then(data => data)
    .catch(e => defaultError(e))
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
