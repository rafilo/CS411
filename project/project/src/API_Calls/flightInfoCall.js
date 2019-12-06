const request = require('request');
const client_id = 'sQ51e8MSyoA7Pu7ujM5bLyaGDWwwTnZi'; // Your client id
const client_secret = 'fzWlzUNAeww2AJcv'; // Your secret

function getFlights(destination){
  var authOptions = {
    url: 'https://test.api.amadeus.com/v1/security/oauth2/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'client_credentials'
    },
    json: true

  };

  
  //   request.post(authOptions, function(error, response, body) {
  //   if (!error && response.statusCode === 200) {
  //     const access_token = body.access_token;
  //     // console.log(body)
  //     var options = {
  //       url: 'https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=BOS&destinationLocationCode='+ destination +'&&departureDate=2020-01-01&adults=1',
  //       headers: { 'Authorization': 'Bearer ' + access_token },
  //       json: true
  //     };

  //     request.get(options, function(error, response, body) {
  //       // console.log(body.data)
  //       // for(var i in body.data){
  //       //   console.log(body.data[i].price)
  //       // }
  //     });
      
  //   }
  // });
  
 const result1 =  new Promise((resolve => {
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token;
      // console.log(body)
      var options = {
        url: 'https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=BOS&destinationLocationCode='+ destination +'&&departureDate=2020-01-01&adults=1',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
      };

      const result2 = new Promise((resolve) => {request.get(options, function(error, response, body) {
        // console.log(body.data)
        // for(var i in body.data){
        //   console.log(body.data[i].price)
        // }
        resolve(body.data);
      })})
      resolve(result2);
      
    }
  });
 }))
}
// getFlights();
module.exports.searchFlights = (destination)=>{
  getFlights(destination);
}

