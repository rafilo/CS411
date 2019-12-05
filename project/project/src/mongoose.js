const mongoose = require('mongoose');



mongoose.connect('mongodb://localhost/spotify')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err))


const userSchema = new mongoose.Schema({
      name: String,
      email: String,
      tags: [ String ],
      date: {type: Date, default: Date.now}
  });
//Storing into the collection
const User = mongoose.model('User', userSchema);

async function createUser(user_name, user_email){
  const user = new User({
      name: user_name,
      email: user_email,
      tags: ['spotify']
  });

  const result = await user.save();
  console.log(result);
}


module.exports = mongoose;