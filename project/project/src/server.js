const express = require('express'); // Express web server framework
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const home_page = require('./routes/home');
const callback = require('./routes/callback');
const refresh_token = require('./routes/refresh_token');
const user = require('./routes/user');
const app = express();

console.log(home_page);
app.set('view engine', 'html');
app.set('views','./views');
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

app.use(cors())
   .use(cookieParser());

//These are the routers
app.use('/refresh_token', refresh_token);
app.use('/callback', callback);
app.use('/', home_page);








const port = process.env.PORT || 8888;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

