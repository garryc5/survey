var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema(
    {
      question:
      {
        type: String,
        required: true
      },//key = answer string then = 0;
      answer:{}
    });
    
var surveySchema = new Schema(
  {
    name:
    {
      type:String,
      required: true
    },
    questions:[questionSchema]
  });

var userSchema = new Schema({
    googleId: String,
    surveys: [surveySchema],
    surveysTaken: [String],
    name: String,
  }, {
    timestamps: true
  });  

  module.exports = mongoose.model('User', userSchema);