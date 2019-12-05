const express = require('express'); // Express web server framework
const request = require('request'); // "Request" library
const mongoose = require('mongoose');
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const home_page = require('./routes/home');
const callback = require('./routes/callback');
const refresh_token = require('./routes/refresh_token');
const app = express();

console.log(home_page);
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
const User = mongoose.model('User', userSchema);

/**
 * TODO: Replace each variable name with information gathered from  Spotify oAuth, We want to retrieve the user's name from oAuth instead of hardcoding it here
 */
async function createUser(){
  const user = new User({
      name: 'Postgres Course',
      author: 'Ethan',
      tags: ['postgres', 'database'],
      isPublished: true
  });

  const result = await user.save();
  console.log(result);
}


//These are the routers
app.use('/refresh_token', refresh_token);
app.use('/callback', callback);
app.use('/', home_page);




app.use(cors())
   .use(cookieParser());


const port = process.env.PORT || 8888;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

