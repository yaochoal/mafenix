'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  service: String,
  service_id: Number,
  score: Number,
  user_id: String
   
});


module.exports = mongoose.model('Tasks', TaskSchema);
