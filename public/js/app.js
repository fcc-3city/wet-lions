$(document).ready(function() {
	
  // Initialize collapse button
  $(".button-collapse").sideNav();
  // Initialize collapsible (uncomment the line below if you use the dropdown variation)
  //$('.collapsible').collapsible();

  // Populate list with station names
  $.getJSON(window.location + 'api/stations', function(json) {
  	for(station of json) {
  		$('#slide-out').append('<li><a href="#!">' + station.name + '</a></li>');
  	}
  });

}); 