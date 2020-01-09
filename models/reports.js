// server/models/curso.js

// Incluímos a Mongoose para poder interactuar con MongoDB
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Creamos el Schema, que vendría a ser la estructura de cada documento
var reporteSchema = new Schema({
    hojaRuta:{
        is: Boolean,
        id: Boolean
    },
    url: String
});

// Compilamos el Schema
var Reporte = mongoose.model('Reporte', reporteSchema);

// Creamos las acciones para interactuar con la base de datos
module.exports = {
    create: function (reporte, callback) {
        var newObject = new Reporte(reporte);
        newObject.save(function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response);
            }
        });
    },
    read: function (callback) {
        Reporte.find().exec(function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response)
            }
        });
    },
    update: function (reporte, callback) {
        Reporte.findByIdAndUpdate(reporte._id, reporte, function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response)
            }
        });
    },
    remove: function (id, callback) {
        Reporte.findByIdAndRemove(id, function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response)
            }
        });
    },
    get: function (id, callback) {
        Reporte.findById(id, function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response)
            }
        });
    }
};
