$(document).ready(function() {
	
  // Initialize collapse button
  $(".button-collapse").sideNav();
  // Initialize collapsible (uncomment the line below if you use the dropdown variation)
  //$('.collapsible').collapsible();

  // Populate sidebar with station names
  $.getJSON(window.location + 'api/stations', function(json) {
  	for(station of json) {
  		$('#slide-out').append('<li><a href="#!">' + station.name + '</a></li>');
  	}
  });




  // CHARTS
  $('#date-picker').change(function() {
  	let date = this.value.split("-").join('')
  	console.log(date);

	  $.getJSON(window.location + 'api/measurments/0/' + date, function(json) {
	  	

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

	  });
  })



 


  // CHARTS END

}); 