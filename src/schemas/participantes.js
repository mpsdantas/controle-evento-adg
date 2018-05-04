const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.export = mongoose.model('Participantes', new Schema({
      nome: String,
      cpf: String,
      datanascimento: String,
      email: String,
      telefone: String,
      sexo: String,
      statuscheckin: {
            type: Boolean,
            default: false
      },
      checkin: {
            type: Number,
            default: 0
      },
      checkout: {
            type: Number,
            default: 0
      },
      idPulseira: {
            type: Number,
            default: 0
      }
}));
