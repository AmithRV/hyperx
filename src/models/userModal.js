const { Schema, mongoose } = require('mongoose');

const userSchema = new Schema({
  userid: {
    type: String,
    require: [true, 'Please provide a userid'],
    unique: true,
  },
  email: {
    type: String,
    require: [true, 'Please provide a email'],
    unique: true,
  },
  password: {
    type: String,
    require: [true, 'Please provide a password'],
  },
});

const User = mongoose.models.users || mongoose.model('users', userSchema);
export default User;
