var mongoose = require('mongoose');
Schema = mongoose.Schema;

var RecorridoSchema = new Schema({
  caminoId: {
    type: String,
    default: '',
    required: 'recorrido cannot be blank'
  },  
  titulo: {
      type: String,
      default: '',
      required: 'Title cannot be blank'
    },
    contenido: {
      type: String,
      default: '',
      trim: true
    },
    estado: {
      type:Boolean,
      default: true
    },
    orden: {
        type: Number,
        default: 0
      },
      pathImagen :{
        type:String
      }
  },
  {
      toJSON: { virtuals: true },
      toObject: { virtuals: true }
  });
  
  module.exports = mongoose.model('Recorridos', RecorridoSchema);