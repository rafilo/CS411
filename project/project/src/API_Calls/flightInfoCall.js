const request = require('request');
const client_id = 'sQ51e8MSyoA7Pu7ujM5bLyaGDWwwTnZi'; // Your client id
const client_secret = 'fzWlzUNAeww2AJcv'; // Your secret

function getFlights(){
  var authOptions = {
    url: 'https://test.api.amadeus.com/v1/security/oauth2/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'client_credentials'
    },
    json: true

  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token;
      // console.log(body)
      var options = {
        url: 'https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=PAR&maxPrice=1000',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
      };

      request.get(options, function(error, response, body) {
        console.log(body)
      });
      
    }
  });
  
}
// getFlights();
export const searchFlights = ()=>{
  getFlights();
}

