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
    selectMonths: true,
    selectYears: 5,
    // format: 'yyyy-mm-dd',
    formatSubmit: 'yyyy-mm-dd',
    hiddenPrefix: 'date',
    today: 'Dziś',
    clear: 'Wyczyść',
    close: 'Ok',
    closeOnSelect: true
  }).pickadate('picker').set('select', new Date())

  $('.modal').modal()

    // END MATERIALIZE JQUERY

  let waterChart
  let windChart
  let rainChart

  function populateSideNav () {
        // Populate select tag with station names and define whether they're active
    fetch('/api/stations')
    .then(res => res.json())
    .then(stations => {
      for (station of stations) {
        $('#station-form')
                    .append(`<li>
            <input id=${station.id}_station value=${station.id} name='station' type='radio'/>
            <label for=${station.id}_station>
              ${station.active == true ? '🌧' : '🌤'} ${station.name}
            </label>
            </li>`)
      };
    })
  }
  populateSideNav()

  function parseDate (entries) {
    const labels = []
    for (entry of entries) {
      labels.push(entry.date.split('T')[1])
    }
    return labels
  } // funkcja parsująca datę do używalnego formatu i dająca labele do wykresu

  function getDatapoints (entries, sensor) {
    const datapoints = []
    for (entry of entries) {
      if (typeof entry[sensor] !== 'undefined') {
        datapoints.push(entry[sensor])
      }
    }
    console.log(datapoints)
    return datapoints
  }

  function makeChartMagic (id, chart, labels, data, header) {
    const chartDiv = document.createElement('div')
    const canvasDiv = document.createElement('canvas')

    chartDiv.id = id
    chartDiv.className = 'chart'
    chartDiv.innerHTML = `<h4>${header}</h4>`

    chart = new Chart(canvasDiv.getContext('2d'), {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'm',
          data: data,
          backgroundColor: 'rgba(99, 99, 132, 0.5)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              suggestedMin: 1,
              suggestedMax: 5
            }
          }]
        }
      }
    })

    chartDiv.appendChild(canvasDiv)
    return chartDiv
  }

    // CHARTS
  $('.select-station').change(function () {
    const date = $("input[name='date_submit']").val()
    const station = $("input[type='radio']:checked").val()

    if ((typeof date !== 'undefined') && (typeof station !== 'undefined')) {
      console.log(`fetch from /api/measurments/${station}/${date}`)

      // Materialize.toast(`Get data from station ${station}`, 10000)

      fetch(`/api/stations/${station}`)
      .then(res => res.json())
      .then(station => {
        document.getElementById('station-header').innerHTML = `📡 ${station.name}`
        document.title = `🌧 ${station.name}`
      })

      fetch(`/api/measurments/${station}/${date}`)
      .then(res => res.json())
      .then(json => {
        // console.log(json)

        const charts = document.getElementById('station-measurments')
        charts.innerHTML = ''

        const dateLabels = parseDate(json)
        // console.log(dateLabels)

        const waterData = getDatapoints(json, 'water')
        if (waterData.length > 0) {
          charts.appendChild(makeChartMagic('water', waterChart, dateLabels, waterData, '💧 Poziom wody'))
        }

        const rainData = getDatapoints(json, 'rain')
        if (rainData.length > 0) {
          charts.appendChild(makeChartMagic('rain', waterChart, dateLabels, rainData, '🌧 Opady deszczu'))
        }

        const windData = getDatapoints(json, 'windLevel')
        if (windData.length > 0) {
          charts.appendChild(makeChartMagic('wind-level', waterChart, dateLabels, windData, '🍃 Siła wiatru'))
        }

        if (charts.innerHTML === '') {
          charts.innerHTML = '<p class="flow-text">Brak pomiarów</p>'
        }
      })
      // .then(_ => {
      //   let toastElement = $('.toast').first()[0]
      //   let toastInstance = toastElement.M_Toast
      //   toastInstance.remove()
      // })
    }
  })
})
