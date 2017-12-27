const axios = require('axios')
const cache = require('memory-cache')

function fetchStations () {
  const cached = cache.get('stations')
  return cached !== null ? Promise.resolve(cached) : axios.get('http://pomiary.gdmel.pl/rest/stations')
    .then(res => res.data)
    .then(json => json.data)
    .then(data => data.map(station => stationToModel(station)))
    .then(data => data.sort((a, b) => a.id - b.id))
    .then(data => {
      cache.put('stations', data, 100000)
      return data
    })
}

function stationToModel (data) {
  return {
    id: data.no,
    name: data.name,
    active: data.active,
    sensors: {
      rain: data.rain,
      water: data.water,
      windDir: data.winddir,
      windLevel: data.windlevel
    }
  }
}

module.exports = fetchStations
