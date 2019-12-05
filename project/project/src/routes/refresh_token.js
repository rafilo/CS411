const express = require('express');
const router = express.Router();
const request = require('request'); // "Request" library
const mongoose = require('mongoose');
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const stateKey = 'spotify_auth_state';
const client_id = '1ca6c4fa378a440881203b24132c769f'; // Your client id
const client_secret = 'a9194f0771c34c8d885d64ae4c6b7c76'; // Your secret
const redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri

router.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});



module.exports = router;