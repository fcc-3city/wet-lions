$(document).ready(function() {


// MATERIALIZE JQUERY
	$('select').material_select();

  $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: true, // Does not change width of dropdown to that of the activator
      hover: false, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    }
  );

// END MATERIALIZE JQUERY


  

  // Populate select tag with station names  
  $.getJSON(window.location + 'api/stations', function(json) {

  	for(station of json) {  		
  		$('#station-form').append(`<p><input id=${station.id}_station value=${station.id} name='station' type='radio'/><label for=${station.id}_station>${station.name}</label></p>`);
  	};
  });


  // CHARTS
  $('.select-station').change(function() {
  	

  	let date = $('#date-picker').val().split("-").join('')
  	let station = $("input[type='radio']:checked").val()
  	console.log(date);
  	console.log(station)


  	

	  $.getJSON(window.location + `api/measurments/${station}/` + date, function(json) {
	  	

	  	function parseDate() {
	  		const labels = [];
	  		for(entry of json) {
	  			let date = new Date(entry.date);
	  			const leadingZero = (num) => `0${num}`.slice(-2);
				  const labelDate = [date.getHours(), date.getMinutes()]
				  .map(leadingZero)
				  .join(':');
				  console.log(labelDate);
				  labels.push(labelDate);
	  		}
	  		return labels;
	  	} // funkcja parsująca datę do używalnego formatu i dająca labele do wykresu
			
			function getWaterLevel() {
				const waterLevels = [];
				for(entry of json) {
					waterLevels.push(entry.water)
				}
				return waterLevels;
			}


			var ctx = document.getElementById("myChart").getContext('2d');
			var myChart = new Chart(ctx, {
			    type: 'line',
			    data: {
			        labels: parseDate(),
			        datasets: [{
			            label: 'mm',
			            data: getWaterLevel(),
			            backgroundColor:'rgba(255, 99, 132, 0.2)',		            
			            borderWidth: 1
			        }]
			    },
			    options: {
			        scales: {
			            yAxes: [{
			                ticks: {
			                    beginAtZero:true
			                }
			            }]
			        }
			    }
			});	 

	  }); // end getJSON
  }); // end date-picker change



 


  // CHARTS END

}); 