const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

module.export = mongoose.model('Usuarios', new Schema({
  nome:String,
  email:String,
  senha:String,
}))
