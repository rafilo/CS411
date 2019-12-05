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

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

router.get('/', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email user-read-playback-state';
  
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
    // console.log(access_token)
});

module.exports = router;