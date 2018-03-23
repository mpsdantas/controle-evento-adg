const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

module.export = mongoose.model('Participantes', new Schema({
  nome:String,
  cpf:String,
  datanascimento:String,
  email:String,
  telefone: String,
  sexo:String,
  statuscheckin: Boolean,
  checkin: Number,
  checkout: Number,
  idPulseira: Number
}))
