$(document).ready(_ => {
  var startEnd = moment().subtract(6, 'days')
  var endEnd = moment()

  var cb = (start, end) => {
    $('#daterange').val(start.format('YYYY/MM/DD') + ' - ' + end.format('YYYY/MM/DD'))
  }

  const drp = $('#daterange').daterangepicker({
    startDate: startEnd,
    endDate: endEnd,
    maxDate: moment(),
    dateLimit: moment.duration(1, 'weeks'),
    ranges: {
      'Today': [moment(), moment()],
      'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'Last 7 Days': [moment().subtract(6, 'days'), moment()]
      // 'Last 30 Days': [moment().subtract(29, 'days'), moment()],
      // 'This Month': [moment().startOf('month'), moment().endOf('month')],
      // 'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    },
    locale: {
      format: 'YYYY/MM/DD'
    }
  }, cb).data('daterangepicker')
  cb(startEnd, endEnd)

  // console.log(drp)

  var width = 300
  var height = 20
  var x = d3.scaleLinear().range([0, width - 2])
  var y = d3.scaleLinear().range([height - 4, 0])
  var parseDate = d3.utcParse('%Y-%m-%dT%H:%M:%S.%LZ')
    // console.log(parseDate)
  var line = d3.line()
        .curve(d3.curveBasis)
        .x(function (d) { return x(d.date) })
        .y(function (d) { return y(d.water) })

  function sparkline (elemId, data) {
    data.forEach(function (d) {
      d.date = parseDate(d.date)
            // d.water = d.water
    })
        // console.log(data)
    x.domain(d3.extent(data, function (d) { return d.date }))
    y.domain(d3.extent(data, function (d) { return d.water }))

    var svg = d3.select(elemId)
            .html('')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate(0, 2)')
    svg.append('path')
            .datum(data)
            .attr('class', 'sparkline')
            .attr('class', 'water')
            .attr('d', line)
  }

  const table = $('tbody')
  let stations2

  function populateSparlines (station) {
    fetch(`/api/measurments/${station.id}/${drp.startDate.format('YYYY-MM-DD')}/${drp.endDate.format('YYYY-MM-DD')}`)
            .then(res => res.json())
            .then(data => sparkline(`#water_${station.id}`, data))
  }

  function populateTable (stations) {
    for (station of stations) {
      populateSparlines(station)
    }
  }

  fetch('/api/stations')
        .then(res => res.json())
        .then(stations => {
          stations2 = stations
          return stations
        })
        .then(stations => {
          for (station of stations) {
            table.append(`<tr id="station_${station.id}">
                <th scope="row">${station.id}</th>
                <td>${station.active == true ? '🌧' : '🌤'} ${station.name}</td>
                <td><span id="water_${station.id}"></span></td>
                </tr>`)
          }
          return stations
        })
        .then(populateTable)

  $('.card-body').on('click', 'button', function () {
    populateTable(stations2)
  })
})
