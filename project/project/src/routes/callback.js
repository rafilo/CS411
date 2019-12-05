
const express = require('express');
const router = express.Router();
const request = require('request'); // "Request" library
const querystring = require('querystring');
const stateKey = 'spotify_auth_state';
const client_id = '1ca6c4fa378a440881203b24132c769f'; // Your client id
const client_secret = 'a9194f0771c34c8d885d64ae4c6b7c76'; // Your secret
const redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri
// var token = null;



router.get('/', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  // }

  if (state === null || state !== storedState) {
    // console.log("Error")
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    // console.log("Happy Path")
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },  
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

            access_token = body.access_token,
            refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };
        

        // use the access token to access the Spotify Web API
        // request.get(options, function(error, response, body) {
          // console.log(body);
          // console.log("Email: " + body.email)
          // console.log("Display Name: " + body.display_name)
          // var user_id = body.id;
          // console.log(access_token);
          
          

        // });
        // res.send("????")
        var artist_url = "https://api.spotify.com/v1/me/top/artists"
        request.get({url:artist_url, headers:{"Authorization": "Bearer " + access_token }}, function(err, res) {
          if(res){
            // console.log(res)
            var artists=JSON.stringify(body);
            console.log(artists)
          }
            
        })

        res.redirect('http://localhost:3000/home' );
        // +
          // querystring.stringify({
          // access_token: access_token,
          // refresh_token: refresh_token
          
          // }));
          // console.log(access_token);
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
    
  }
});



module.exports = router;