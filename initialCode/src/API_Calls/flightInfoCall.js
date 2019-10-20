import $ from 'jquery'
function getFlightInfo(searchQuery){
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/v1.0",
        "method": "POST",
        "headers": {
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            "x-rapidapi-key": "1c8dab8560msh7d0ced956f9bcdbp173cb1jsnbb8e1fd3d88d",
            "content-type": "application/x-www-form-urlencoded"
        },
        "data": {
            "inboundDate": "2019-09-10",
            "cabinClass": "business",
            "children": "0",
            "infants": "0",
            "country": "US",
            "currency": "USD",
            "locale": "en-US",
            "originPlace": "SFO-sky",
            "destinationPlace": "LHR-sky",
            "outboundDate": "2019-09-01",
            "adults": "1"
        }
    }
}
$.ajax(settings).done(function (response) {
	console.log(response);
})

export const flightInfo = (flight)=>{
    getFlightInfo(searchQuery);
}