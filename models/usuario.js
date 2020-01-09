// server/models/curso.js

// Incluímos a Mongoose para poder interactuar con MongoDB
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Creamos el Schema, que vendría a ser la estructura de cada documento
var usuarioSchema = new Schema({
    username: String,
    mail: String,
    password: String,
    perfil: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Perfil'
    },
    nombre: String,
    apellido: String,
    movilNumero: String
});

usuarioSchema.methods.validPassword = function (pwd) {
    return (this.password === pwd);
};

// Compilamos el Schema
var Usuario = mongoose.model('Usuario', usuarioSchema);

// Creamos las acciones para interactuar con la base de datos
module.exports = {
    create: function (usuario, callback) {
        var newObject = new Usuario(usuario);
        newObject.save(function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response);
            }
        });
    },
    read: function (callback) {
        Usuario.find({
            $and: [
                {
                    username: {
                        '$ne': ''
                    }
                },
                {
                    username: {
                        '$ne': null
                    }
                }
            ]
        }).
        populate('perfil').
        exec(function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response)
            }
        });
    },
    update: function (usuario, callback) {
        Usuario.findByIdAndUpdate(usuario._id, usuario, function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response)
            }
        });
    },
    remove: function (id, callback) {
        Usuario.findByIdAndRemove(id, function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response)
            }
        });
    },
    get: function (id, callback) {
        Usuario.findById(id).
        populate('perfil').
        exec(function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response)
            }
        });
    },
    checkUsername: function (user, callback) {
        var query = {};

        query["$or"] = [];
        query["$or"].push({
            'username': user.username
        });
        query["$or"].push({
            'mail': user.mail
        });
        Usuario.findOne(query).exec(function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response)
            }
        });
    },
    getByName: function (user, callback) {
        Usuario.findOne({
            mail: user.mail
        }).exec(function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response)
            }
        });
    },
    login: function (user, callback) {
        Usuario.findOne({
            'username': user.user,
            'password': user.pass
        }).exec(function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response)
            }
        });
    }
};
