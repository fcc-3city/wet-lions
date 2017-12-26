const express = require('express')
const moment = require('moment')
const router = express.Router()

const fetchMeasurments = require('../controllers/measurments')

router.get('/', (req, res) => {
  res.send('measurments, specify stationId and date')
})

router.get('/:stationId/:date', (req, res) => {
  console.log('fetchMeasurments', req.params)
  fetchMeasurments(Number(req.params.stationId), moment(req.params.date))
  .then(data => res.json(data))
})

// TODO: Range
router.get('/:stationId/:dateStart/:dateEnd', (req, res) => {
  req.send('not implemented')
})

module.exports = router
