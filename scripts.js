$(document).ready(function() {

	var currentStr;


	$( "#cityfield" ).keyup(function() {
	  	var url = "http://bioresearch.byu.edu/cs260/jquery/getcity.cgi?q="+$("#cityfield").val();
		$.getJSON(url,function(data) {
	    currentStr = null;
		console.log("data");
	    var everything;
	    everything = "<ul>";
	    $.each(data, function(i,item) {
	    	if(i == 0) {
	    		currentStr = data[i].city;
	    	}
	      	everything += "<li> "+data[i].city;
	    });
	    everything += "</ul>";
	    $("#txtHint").html(everything);
	  });
	});



	$("#button").click(function(e) {
		if(currentStr != null) {
			$("#dispcity").html(currentStr);
			e.preventDefault();

			var myurl= "https://api.wunderground.com/api/61ad201e157ac782/geolookup/conditions/q/UT/"+currentStr+".json";
			console.log(myurl);
			$.ajax({
				url : myurl,
				dataType : "json",
				success : function(parsed_json) {
					console.log("success");

					var location = parsed_json['location']['city'];
					var temp_string = parsed_json['current_observation']['temperature_string'];
					var current_weather = parsed_json['current_observation']['weather'];
					console.log(location);

					var list = "";
					list = "<p>Current weather for "+location+":</p><ul>";
					list += "<li>"+temp_string+", "+current_weather;
					list += "</ul>";
					$("#weather").html(list);
				}
			});
		}
	});



});
