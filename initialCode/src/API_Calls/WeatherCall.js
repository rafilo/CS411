import $ from 'jquery'
function getWeather(searchQuery){
	var url = "https://api.openweathermap.org/data/2.5/weather?q=" + searchQuery + "&units=imperial&APPID=371f4da6a6c53abe4ec15fdc5c3012a9";
	// This part resets the entry whenever we click a search button
	$(".city").text("");
	$(".temp").text("");
	$(".error-message").text("");

	//IF success, do this, else IF fail display error message
	// Jquery $ targets HTMl elements with a certain class
	$.ajax(url,{success: function(data){
		$(".city").text(data.name);
		$(".temp").text(data.main.temp);
	}, error: function(error){
		$(".error-message").text("An error occured");
	}})
}
export const searchWeather = (searchQuery)=>{
    getWeather(searchQuery);
}

// function searchWeather(searchQuery){
// 	getWeather(searchQuery);
// }