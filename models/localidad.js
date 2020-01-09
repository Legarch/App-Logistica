// server/models/curso.js

// Incluímos a Mongoose para poder interactuar con MongoDB
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Creamos el Schema, que vendría a ser la estructura de cada documento
var localidadSchema = new Schema({
    nombre: String,
    provincia: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provincia'
    },
    codigoPostal: String,
    coordenadas: {
        lat: String,
        long: String
    }
});

// Compilamos el Schema
var Localidad = mongoose.model('Localidad', localidadSchema);

// Creamos las acciones para interactuar con la base de datos
module.exports = {
    create: function (localidad, callback) {
        var newObject = new Localidad(localidad);
        newObject.save(function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response);
            }
        });
    },
    read: function (callback) {
        Localidad.find().
        populate('provincia').
        exec(function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response)
            }
        });
    },
    update: function (localidad, callback) {
        Localidad.findByIdAndUpdate(localidad._id, localidad, function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response)
            }
        });
    },
    remove: function (id, callback) {
        Localidad.findByIdAndRemove(id, function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response)
            }
        });
    },
    get: function (id, callback) {
        Localidad.findById(id).
        populate('provincia').
        exec(function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response)
            }
        });
    }
};
