const fetch = require("node-fetch");

function unenvelope(envelope) {
  return envelope['data']
}

function stations(callback) {

  fetch('http://pomiary.gdmel.pl/rest/stations')
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    }).then((json) => {
      const data = unenvelope(json);
      console.log(data);
    });

  // request('http://pomiary.gdmel.pl/rest/stations', (error, response, body) => {
  //   if(!error && response.statusCode == 200) {
  //     console.log(body) // Print the google web page.
  //     body = JSON.parse(body)
  //     data.sort(function(a, b) {
  //       return parseFloat(a.no) - parseFloat(b.no);
  //     });
  //     console.log(data);
  //     callback(data);
  //
  //   }
  // })
}

stations(() => {})
