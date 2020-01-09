// server/models/curso.js

// Incluímos a Mongoose para poder interactuar con MongoDB
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Creamos el Schema, que vendría a ser la estructura de cada documento
var obraSchema = new Schema({
    imputacion: String,
    direccion: String,
    localidad: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Localidad'
    },
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente'
    },
});

// Compilamos el Schema
var Obra = mongoose.model('Obra', obraSchema);

// Creamos las acciones para interactuar con la base de datos
module.exports = {
    create: function (obra, callback) {
        var newObject = new Obra(obra);
        newObject.save(function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response);
            }
        });
    },
    read: function (callback) {
        Obra.find().
        populate('localidad').
        populate('cliente').
        exec(function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response)
            }
        });
    },
    update: function (obra, callback) {
        Obra.findByIdAndUpdate(obra._id, obra, function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response)
            }
        });
    },
    remove: function (id, callback) {
        Obra.findByIdAndRemove(id, function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response)
            }
        });
    },
    get: function (id, callback) {
        Obra.findById(id).
        populate('localidad').
        populate('cliente').
        exec(function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response)
            }
        });
    }
};
