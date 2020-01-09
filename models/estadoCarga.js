// server/models/curso.js

// Incluímos a Mongoose para poder interactuar con MongoDB
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Creamos el Schema, que vendría a ser la estructura de cada documento
var estadoCargaSchema = new Schema({
    estado: String,
    default: Boolean,
    estadoFinal: Boolean
});

// Compilamos el Schema
var Esi = mongoose.model('Esi', estadoCargaSchema);

// Creamos las acciones para interactuar con la base de datos
module.exports = {
    create: function (esi, callback) {
        var newObject = new Esi(esi);
        newObject.save(function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response);
            }
        });
    },
    read: function (callback) {
        Esi.find().exec(function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response)
            }
        });
    },
    update: function (esi, callback) {
        Esi.findByIdAndUpdate(esi._id, esi, function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response)
            }
        });
    },
    remove: function (id, callback) {
        Esi.findByIdAndRemove(id, function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response)
            }
        });
    },
    get: function (id, callback) {
        Esi.findById(id, function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response)
            }
        });
    },
    getEstadoFinal: function (callback){
        Esi.find({'estadoFinal': true}).exec(function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response)
            }
        });
    }
};
