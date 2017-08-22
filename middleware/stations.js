const request = require("request");
// const https = require("https");

function unenvelope(envelope, callback) {
  data = envelope['data']
  callback(data)
  // console.log(data);
  // callback(data)
  // return data
}

function stations(callback) {
  request('http://pomiary.gdmel.pl/rest/stations', (error, response, body) => {
    if(!error && response.statusCode == 200) {
      console.log(body) // Print the google web page.
      body = JSON.parse(body)
      unenvelope(body, (data) => {
        data.sort(function(a, b) {
          return parseFloat(a.no) - parseFloat(b.no);
        });
        console.log(data);
        callback(data);
      });

    }
  })
}

stations(() => {})
