$(document).ready(function () {
    // MATERIALIZE JQUERY

  $('.button-collapse').sideNav()
  $('select').material_select()

  $('.dropdown-button').dropdown({
    inDuration: 300,
    outDuration: 225,
    constrainWidth: true, // Does not change width of dropdown to that of the activator
    hover: false, // Activate on hover
    gutter: 0, // Spacing from edge
    belowOrigin: false, // Displays dropdown below the button
    alignment: 'left', // Displays dropdown with edge aligned to the left of button
    stopPropagation: false // Stops event propagation
  })

  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 5, // Creates a dropdown of 15 years to control year,
        // format: 'yyyy-mm-dd',
    formatSubmit: 'yyyy-mm-dd',
    hiddenPrefix: 'date',
        // hiddenName: true,
    today: 'Dziś',
    clear: 'Wyczyść',
    close: 'Ok',
    closeOnSelect: true
  })

  $('.modal').modal()

    // END MATERIALIZE JQUERY

  function populateSideNav () {
        // Populate select tag with station names and define whether they're active
    $.getJSON('/api/stations', json => {
      for (station of json) {
        $('#station-form')
                    .append(`<li>
            <input id=${station.id}_station value=${station.id} name='station' type='radio'/>
            <label for=${station.id}_station>${station.active == true ? '🌧' : '🌤'} ${station.name}</label>
            </li>`)
      };
    })
  }
  populateSideNav()

    // CHARTS
  $('.select-station').change(function () {
    const date = $("input[name='date_submit']").val()
    const station = $("input[type='radio']:checked").val()

    if (typeof date !== 'undefined' && typeof station !== 'undefined') {
      console.log(`/api/measurments/${station}/${date}`)
      $.getJSON(`/api/measurments/${station}/${date}`, json => {
        function parseDate () {
          const labels = []
          for (entry of json) {
            let date = new Date(entry.date)
            const leadingZero = (num) => `0${num}`.slice(-2)
            const labelDate = [date.getHours(), date.getMinutes()]
                            .map(leadingZero)
                            .join(':')
            // console.log(labelDate)
            labels.push(labelDate)
          }
          return labels
        } // funkcja parsująca datę do używalnego formatu i dająca labele do wykresu

        function getWaterLevel () {
          const waterLevels = []
          for (entry of json) {
            if (entry.water == 4000) {
              entry.water = 0
              waterLevels.push(entry.water)
            } else {
              waterLevels.push(entry.water)
            }
          }
          return waterLevels
        }

        function getWindSpeed () {
          const windSpeeds = []
          for (entry of json) {
            if (entry.windLevel == 4000) {
              entry.windLevel = 0
              windSpeeds.push(entry.windLevel)
            } else {
              windSpeeds.push(entry.windLevel)
            }
          }
          return windSpeeds
        }

        $.getJSON(`/api/stations/${station}`, station => {
          document.getElementById('station-header').innerHTML = `📡 ${station.name}`
          document.title = `🌧 ${station.name}`
        })

                // WATER LEVEL CHART

        const ctx = document.getElementById('water-level').getContext('2d')
        const waterChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: parseDate(),
            datasets: [{
              label: 'm',
              data: getWaterLevel(),
              backgroundColor: 'rgba(99, 99, 132, 0.5)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        })
                // WATER LEVEL CHART END8

                // WIND SPEED CHART
        const ctw = document.getElementById('wind-speed').getContext('2d')
        const windChart = new Chart(ctw, {
          type: 'line',
          data: {
            labels: parseDate(),
            datasets: [{
              label: 'm/s',
              data: getWindSpeed(),
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        })
                // WIND SPEED CHART END
      }) // end getJSON
    }
  }) // end date-picker change

    // CHARTS END
})
