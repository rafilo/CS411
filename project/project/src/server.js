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

const Countries = {
   Pop: {name: "New York",description: "New York is the world’s largest center for pop culture. The music market in the United States is more than triple the size of any other country’s. Live music ticket sales make up the largest share of the market, home to six of the 10 highest grossing venues. Madison Square Garden in New York City regularly welcomes more than 18,000 concert-goers who come to see iconic pop stars like Shawn Mendes, Taylor Swift, and many more." },
   Country: {name: "Nashville",description: "Nashville, also sometimes referred to as Music City, is the world’s largest center for country music. Country is one of America’s favorite music genre (21%). The music market in the United States is more than triple the size of any other country’s. Live music ticket sales make up the largest share of the market, home to six of the 10 highest grossing venues.  Nashville contains “Grand Ole Opry” which is the oldest still-running live radio show in existence and Ryman Auditorium, recognized as the Carnegie Hall of the South,, which should also tell you something about the demand for country music and its quality." },
   JPop: {name: "Tokyo",description: "Surprised? Where would you go if not Japan to explore your love for J-Pop. Just like J-Pop known for its iconic electronic synth-pop and technopop, Japan is a bustling city filled with culture. People driving around in Mario Kart cars on the street. All those big blown up signs and other 3D models in the streets, maid cafes and grown ups in game halls. Japan is a unique place in the world just like its music industry.  " },
   KPop: {name: "Seoul",description: "Surprised? Where would you go if not South Korea to explore your love for K-Pop. On most streets, you can see many people showing off their singing or even dancers covering their favorite songs. South Korea's style is known for being expressive and reflecting a sense of individuality. Some say Seoul is Asia’s leader in fashion, and they’re even known for their skin care. So why not head to South Korea to experience K-Pop first hand even have the chance to look like your bias. " },
   Classical: {name: "Vienna",description: "Where to go than the heralded “capital of classical music.” Vienna has produced and housed some of the great composers like Strauss, Schubert, Beethoven, and Mozart. Vienna is known for its passionate and long enduring love with art and music. You can see that by the tons of museums and opera houses on the streets. Vienna also is home to one of the world's largest and most splendid theaters, the Vienna State Opera House. The opera house has hosted many of the world's most prominent composers, conductors, soloists, and dancers. If you love classical music, this is the place to go. " }
}

app.use(cors())
   .use(cookieParser());

//These are the routers
app.use('/refresh_token', refresh_token);
app.use('/callback', callback);
app.use('/', home_page);








const port = process.env.PORT || 8888;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

