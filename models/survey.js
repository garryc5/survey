var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
    googleId: String,
    surveys: [],//questionSchema
    name: String,
  }, {
    timestamps: true
  });

  module.exports = mongoose.model('User', userSchema);