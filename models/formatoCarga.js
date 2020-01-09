// server/models/curso.js

// Incluímos a Mongoose para poder interactuar con MongoDB
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Creamos el Schema, que vendría a ser la estructura de cada documento
var formatoSchema = new Schema({
    nombre: String,
    largo: Number,
    ancho: Number,
    alto: Number,
    diametro: Number,
    peso: Number,
    volumen: Number
});

// Compilamos el Schema
var FormatoCarga = mongoose.model('FormatoCarga', formatoSchema);

// Creamos las acciones para interactuar con la base de datos
module.exports = {
    create: function (formatoCarga, callback) {
        var newObject = new FormatoCarga(formatoCarga);
        newObject.save(function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response);
            }
        });
    },
    read: function (callback) {
        FormatoCarga.find().exec(function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response)
            }
        });
    },
    update: function (formatoCarga, callback) {
        FormatoCarga.findByIdAndUpdate(formatoCarga._id, formatoCarga, function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response)
            }
        });
    },
    remove: function (id, callback) {
        FormatoCarga.findByIdAndRemove(id, function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response)
            }
        });
    },
    get: function (id, callback) {
        FormatoCarga.findById(id, function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response)
            }
        });
    }
};
