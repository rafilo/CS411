const express = require('express');
const router = express.Router();
const request = require('request'); // "Request" library
const querystring = require('querystring');
const stateKey = 'spotify_auth_state';
const client_id = '1ca6c4fa378a440881203b24132c769f'; // Your client id
const client_secret = 'a9194f0771c34c8d885d64ae4c6b7c76'; // Your secret
const redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri
const mongoose = require('mongoose');

// var token = null;


router.get('/', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter
  mongoose.connect('mongodb://localhost/epo')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err))


  const userSchema = new mongoose.Schema({
      name: String,
      email: String,
      topGenre: String,
      date: {type: Date, default: Date.now}
    });
//Storing into the collection
  const User = mongoose.model('User', userSchema);

  async function createUser(user_name, user_email, genre){
  const user = new User({
      name: user_name,
      email: user_email,
      topGenre: genre
    });

  const result = await user.save();
  console.log(result);
  }

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
        request.get(options, function(error, response, body) {
          console.log(body);
          console.log("Email: " + body.email)
          console.log("Display Name: " + body.display_name)
          var user_id = body.id;
          console.log(access_token);
          

        });
        // res.send("????")
        var artist_url = "https://api.spotify.com/v1/me/top/artists"
        request.get({url:artist_url, headers:{"Authorization": "Bearer " + access_token }}, function(err, res) {
          try{
          if(res){
            // console.log(res)
            // var artists=JSON.stringify(res);
            let genres = {}
            const data = JSON.parse(res.body)
            const artist_info = data.items
            for(var artist in artist_info){
              var artist_genre = artist_info[artist].genres 
              for(var genre in artist_genre){
                // console.log(artist_genre[genre])
                var curr_genre = (artist_genre[genre])
                if(curr_genre in genres){
                  genres[curr_genre]+=1;
                }
                else{
                  genres[curr_genre]=1;
                }
              }
              
              
            }
            // console.log(genres)
            const topGenre = Object.keys(genres).reduce((a, b) => genres[a] > genres[b] ? a : b);
            console.log("Top genre is " + topGenre)
            // console.log(artists)
            createUser(body.display_name, body.email, topGenre);
            module.exports.topGenre = topGenre;
            

          }
        }
        catch{
          const topGenre = "";
          module.exports.topGenre = topGenre;
        }
        })

        res.redirect('http://localhost:3000' );
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