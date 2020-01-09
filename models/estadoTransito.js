// server/models/curso.js

// Incluímos a Mongoose para poder interactuar con MongoDB
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Creamos el Schema, que vendría a ser la estructura de cada documento
var estadoTransitoSchema = new Schema({
    estado: String,
    default: Boolean,
    estadoFinal: Boolean
});

// Compilamos el Schema
var Eop = mongoose.model('Eop', estadoTransitoSchema);

// Creamos las acciones para interactuar con la base de datos
module.exports = {
    create: function (eop, callback) {
        var newObject = new Eop(eop);
        newObject.save(function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response);
            }
        });
    },
    read: function (callback) {
        Eop.find().exec(function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response)
            }
        });
    },
    update: function (eop, callback) {
        Eop.findByIdAndUpdate(eop._id, eop, function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response)
            }
        });
    },
    remove: function (id, callback) {
        Eop.findByIdAndRemove(id, function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response)
            }
        });
    },
    get: function (id, callback) {
        Eop.findById(id, function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response)
            }
        });
    }
};
