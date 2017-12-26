const express = require('express')
const router = express.Router()

const momentBase = require('moment')
const momentRange = require('moment-range')
const moment = momentRange.extendMoment(momentBase)

const fetchMeasurments = require('../controllers/measurments')

router.get('/', (req, res) => {
  res.status(510).send('measurments, specify stationId and date')
})

router.get('/:stationId/:date', (req, res) => {
  // console.log('fetchMeasurments', req.params)

  fetchMeasurments(Number(req.params.stationId), moment(req.params.date))
  .then(data => res.json(data))
})

router.get('/:stationId/:dateStart/:dateEnd', (req, res) => {
  // console.log('fetchMeasurments', req.params)

  const stationId = Number(req.params.stationId)
  const dateRange = moment.range(req.params.dateStart, req.params.dateEnd)

  let promises = []
  for (let day of dateRange.by('day')) {
    promises.push(fetchMeasurments(stationId, day))
  }

  Promise.all(promises)
  .then(measurments => [].concat(...measurments))
  .then(result => res.json(result))
})

module.exports = router
