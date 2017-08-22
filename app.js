const harcodeJSON = `[
  {
    "date": "2016-05-11 05:00:00",
    "station_id": 0,
    "temp": 20,
    "water": 2,
    "rain": 0.2,
    "wind": {
      "dir": "NE",
      "level": 1
    }
  },
  {
    "date": "2016-05-11 06:00:00",
    "station_id": 0,
    "temp": 20,
    "water": 2,
    "rain": 0.2,
    "wind": {
      "dir": "NE",
      "level": 1
    }
  },
  {
    "date": "2016-05-11 07:00:00",
    "station_id": 0,
    "temp": 20,
    "water": 2,
    "rain": 0.2,
    "wind": {
      "dir": "NE",
      "level": 1
    }
  }
]`

const bodyParser = require('body-parser')
const express = require('express')
const app = express()

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/api/measurements', (req, res) => {
    res.status(200)
    res.set('Content-Type', 'application/json')
    res.send(JSON.parse(harcodeJSON))
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})