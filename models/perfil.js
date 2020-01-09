// server/models/curso.js

// Incluímos a Mongoose para poder interactuar con MongoDB
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Creamos el Schema, que vendría a ser la estructura de cada documento
var perfilschema = new Schema({
    nombre: String,
    descripcion: String,
    permisos:{
        all: Boolean,
        necesidades: Boolean,
        hojaRuta: Boolean,
        cargas: Boolean,
        obras: Boolean,
        clientes: Boolean,
        usuarios: Boolean,
        estadoTransito: Boolean,
        destinos: Boolean,
        transporte: Boolean
    }
});

// Compilamos el Schema
var Perfil = mongoose.model('Perfil', perfilschema);

// Creamos las acciones para interactuar con la base de datos
module.exports = {
    create: function (perfil, callback) {
        var newObject = new Perfil(perfil);
        newObject.save(function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response);
            }
        });
    },
    read: function (callback) {
        Perfil.find({
            $and: [
                {
                    nombre: {
                        '$ne': ''
                    }
                },
                {
                    nombre: {
                        '$ne': null
                    }
                }
            ]
        }).exec(function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response)
            }
        });
    },
    update: function (perfil, callback) {
        Perfil.findByIdAndUpdate(perfil._id, perfil, function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response)
            }
        });
    },
    remove: function (id, callback) {
        Perfil.findByIdAndRemove(id, function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response)
            }
        });
    },
    get: function (id, callback) {
        Perfil.findById(id, function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response)
            }
        });
    }
};
