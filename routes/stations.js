const express = require('express')
const router = express.Router()

const fetchStations = require('../controllers/stations')

router.get('/', (req, res) => {
  fetchStations()
  .then(data => res.json(data))
})

router.get('/:id', (req, res) => {
  fetchStations()
  .then(data => data.find(station => station.id === Number(req.params.id)))
  .then(data => res.json(data))
})

module.exports = router
