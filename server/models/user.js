var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  login: String,
  password: String,
  games: [
    {
      title: String,
      description: String,
      stories: [
        {
          title: String,
          description: String,
          score: mongoose.Schema.Types.Mixed,
          active: Boolean
        }
      ]
    }
  ]
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
