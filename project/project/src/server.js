var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
const mongoose = require('mongoose');
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var access_token

var client_id = '1ca6c4fa378a440881203b24132c769f'; // Your client id
var client_secret = 'a9194f0771c34c8d885d64ae4c6b7c76'; // Your secret
var redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri

/**
 * Function to connect to Mongoose (localhost)
 * Added by: Ethan T Go
 */
mongoose.connect('mongodb://localhost/user')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err))
/**
 * The following is a schema for user, every time a user is added we add their data into mongoDB with the follwoing semantics
 */
const userSchema = new mongoose.Schema({
      name: String,
      email: String,
      tags: [ String ],
      date: {type: Date, default: Date.now}
  });
//Storing into the collection
const User = mongoose.model('User', courseSchema);

/**
 * TODO: Replace each variable name with information gathered from  Spotify oAuth, We want to retrieve the user's name from oAuth instead of hardcoding it here
 */
async function createUser(){
  const course = new Course({
      name: 'Postgres Course',
      author: 'Ethan',
      tags: ['postgres', 'database'],
      isPublished: true
  });

  const result = await course.save();
  console.log(result);
}

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

var stateKey = 'spotify_auth_state';

var app = express();

app.use(cors())
   .use(cookieParser());


app.get('/', function(req, res) {

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

app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
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
        request.get(options, function(error, response, body) {
          console.log(body);
          console.log("Email: " + body.email)
          console.log("Display Name: " + body.display_name)
        });
        // res.send("????")
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

app.get('/refresh_token', function(req, res) {

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

const port = process.env.PORT || 8888;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

