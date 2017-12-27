const express = require('express')
const router = express.Router()

const getStations = require('../controllers/stations')

router.get('/', (req, res) => {
  getStations()
  .then(data => res.json(data))
})

router.get('/:id', (req, res) => {
  getStations()
  .then(data => data.find(station => station.id === Number(req.params.id)))
  .then(data => res.json(data))
})

module.exports = router
