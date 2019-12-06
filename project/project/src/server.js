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


app.use(cors())
   .use(cookieParser());

//These are the routers
app.use('/refresh_token', refresh_token);
app.use('/callback', callback);
app.use('/', home_page);








const port = process.env.PORT || 8888;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

