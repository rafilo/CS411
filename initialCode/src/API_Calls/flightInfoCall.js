import axios from 'axios';
export function getFlights() {
    var now = new Date();
    var outboundDate = (now.getYear() + 1900) + "-" + (now.getMonth() >= 9 ? (now.getMonth() + 1) : "0" + (now.getMonth() + 1));        
    var inboundDate = (now.getYear() + 1900) + "-" + (now.getMonth() >= 8 ? (now.getMonth() + 2) : "0" + (now.getMonth() + 2));
    var request = encodeURI("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/"
                        + this.city.country +"/" + this.city.currency + "/" + this.city.locale + "/" + this.flyOrg + "/" + this.city.airport + "/" + outboundDate) + "?inboundpartialdate=" + inboundDate;
    axios
      .get(request, {
        headers: {
          'X-RapidAPI-Key': this.apiKey
        }})
      .then(response => {
        this.onFlightFetched(response.data);
      });
};