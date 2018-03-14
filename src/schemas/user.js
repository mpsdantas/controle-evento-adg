const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

module.export = mongoose.model('User', new Schema({
  name:String,
  password:String,
  admin: Boolean
}))
