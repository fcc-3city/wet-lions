const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const stations = require('./routes/stations');
const measurments = require('./routes/measurments');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// TODO: docs
app.get('/', (req, res) => {
 res.sendFile(__dirname + '/index.html');
});

app.use('/api/stations', stations);
app.use('/api/measurments', measurments);
app.use(express.static('public')) // serve static files

// TODO: env var, nie mają sensu tak wcześnie, ale niech będzie
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})
