// server/models/curso.js

// Incluímos a Mongoose para poder interactuar con MongoDB
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Creamos el Schema, que vendría a ser la estructura de cada documento
var transporteSchema = new Schema({
    descripcion: String,
    marca: String,
    modelo: String,
    patente: String,
    tara: Number,
    cargaMaxima: Number,
    volumen: Number,
    chofer: String
});

// Compilamos el Schema
var Transporte = mongoose.model('Transporte', transporteSchema);

// Creamos las acciones para interactuar con la base de datos
module.exports = {
    create: function (transporte, callback) {
        var newObject = new Transporte(transporte);
        newObject.save(function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response);
            }
        });
    },
    read: function (callback) {
        Transporte.find().exec(function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response)
            }
        });
    },
    update: function (transporte, callback) {
        Transporte.findByIdAndUpdate(transporte._id, transporte, function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response)
            }
        });
    },
    remove: function (id, callback) {
        Transporte.findByIdAndRemove(id, function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response)
            }
        });
    },
    get: function (id, callback) {
        Transporte.findById(id, function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response)
            }
        });
    }
};
