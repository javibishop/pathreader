var mongoose = require('mongoose');
Schema = mongoose.Schema;

var CaminoSchema = new Schema({
    fecha: {
      type: Date,
      default: Date.now
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
  
  
  module.exports = mongoose.model('Caminos', CaminoSchema);