const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const stations = require('./routes/stations');



// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// TODO: docs
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/stations', stations);


app.get('/api/measurements', (req, res) => {
  console.log('send hardcoded JSON');
  res.json([{
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
  ]);
});


// TODO: env var, nie mają sensu tak wcześnie, ale niech będzie
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})
