const express = require('express'); // Express web server framework
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const home_page = require('./routes/home');
const callback = require('./routes/callback');
const countries = require('./routes/countries');
const refresh_token = require('./routes/refresh_token');
const app = express();

app.engine('pug', require('pug').__express);
// view engine setup
app.set('view engine', 'pug');
//optional, by default it's already set up
app.set('views','./views'); //put all template into a folder called views
app.use(express.static('public'))

app.use(cors())
   .use(cookieParser());

//These are the routers
app.use('/refresh_token', refresh_token);
app.use('/callback', callback);
app.use('/countries', countries)
app.use('/', home_page);
// app.use('/flight', flight);








const port = process.env.PORT || 8888;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

