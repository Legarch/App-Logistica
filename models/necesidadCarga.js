// server/models/curso.js

// Incluímos a Mongoose para poder interactuar con MongoDB
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Creamos el Schema, que vendría a ser la estructura de cada documento
var necesidadSchema = new Schema({
    cliente: String,
    obra: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Obra'
    },
    localidad: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Localidad'
    },
    nota: String,
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    direccion: String,
    cantidad: Number,
    disponibilidadCarga: Number /* 1-No disponible | 2-Disponible */
});

// Compilamos el Schema
var Necesidad = mongoose.model('Necesidad', necesidadSchema);

// Creamos las acciones para interactuar con la base de datos
module.exports = {
    create: function (necesidad, callback) {
        var newObject = new Necesidad(necesidad);
        newObject.save(function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response);
            }
        });
    },
    read: function (callback) {
        Necesidad.find().
        populate('obra').
        populate('localidad').
        populate('usuario').
        exec(function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response)
            }
        });
    },
    update: function (necesidad, callback) {
        Necesidad.findByIdAndUpdate(necesidad._id, necesidad, function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response)
            }
        });
    },
    remove: function (id, callback) {
        Necesidad.findByIdAndRemove(id, function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response)
            }
        });
    },
    get: function (id, callback) {
        Necesidad.findById(id).
        populate('obra').
        populate('localidad').
        populate('usuario').
        exec(function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response)
            }
        });
    },

    getDisponibles: function(callback){
        Necesidad.find({ "disponibilidadCarga": 2 }).
        populate('localidad').
        exec(function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                var necesidades = [];
                for(var i=0; i < response.length;i++){
                    necesidades.push(response[i])
                }            
                callback(null, necesidades)
            }
        })
    }
};
