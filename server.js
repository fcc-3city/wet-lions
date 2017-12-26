const bodyParser = require('body-parser')
const express = require('express')
const app = express()

const stations = require('./routes/stations')
const measurments = require('./routes/measurments')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(express.static('public'))

app.use('/api/stations', stations)
app.use('/api/measurments', measurments)

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`)
})
