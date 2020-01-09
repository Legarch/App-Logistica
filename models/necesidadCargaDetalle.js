// server/models/curso.js

// Incluímos a Mongoose para poder interactuar con MongoDB
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Creamos el Schema, que vendría a ser la estructura de cada documento
var necesidadDetSchema = new Schema({
    necesidad: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Necesidad'
    },
    estadoCarga: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Esi'
    },
    descripcion: String,
    cantidad: Number,
    observacion: String,
    formatoCarga: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FormatoCarga'
    },
    origen: String,
    tipoCarga: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TipoCarga'
    },
    tipoNecesidad: Number, /* 1-Programada | 2- No programada */
    nota: String,
    fecha: Date,
    fechaAlta: Date,
});

// Compilamos el Schema
var NecesidadDet = mongoose.model('NecesidadDetalle', necesidadDetSchema);

// Creamos las acciones para interactuar con la base de datos
module.exports = {
    create: function (detalle, callback) {
        var newObject = new NecesidadDet(detalle);
        newObject.save(function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                NecesidadDet.findById(response._id).
                    populate('estadoCarga').
                    populate('formatoCarga').
                    populate('tipoCarga').
                    exec(function (err, detalle) {
                        if (err) {
                            callback(err, null);
                        } else {
                            callback(null, detalle)
                        }
                    });
            }
        });
    },
    read: function (callback) {
        NecesidadDet.find().
            populate('estadoCarga').
            populate('formatoCarga').
            populate('tipoCarga').
            exec(function (err, response) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, response)
                }
            });
    },
    update: function (detalle, callback) {
        NecesidadDet.findByIdAndUpdate(detalle._id, detalle, function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response)
            }
        });
    },
    remove: function (id, callback) {
        NecesidadDet.findByIdAndRemove(id, function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response)
            }
        });
    },
    get: function (id, callback) {
        NecesidadDet.findById(id).
            populate('estadoCarga').
            populate('formatoCarga').
            populate('tipoCarga').
            exec(function (err, response) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, response)
                }
            });
    },

    getByNecesidad: function (id, callback) {
        var ObjectId = require('mongoose').Types.ObjectId;
        NecesidadDet.find({
            necesidad: new ObjectId(id)
        }).
            populate('estadoCarga').
            populate('formatoCarga').
            populate('tipoCarga').
            exec(function (err, response) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, response);
                }
            });
    },

    getByNecesidades: function (body, callback) {
        var detalles = [];
        var i=0;
        function getDetalles(){
            if(i <body.nececidades.length){
                new Promise(function (resolve, reject) {
                    var ObjectId = require('mongoose').Types.ObjectId;    
                    NecesidadDet.find({
                        necesidad: new ObjectId(body.nececidades[i]._id)
                    }).
                    populate('estadoCarga').
                    populate('formatoCarga').
                    populate('tipoCarga').
                    exec(function (err, response) {
                        if (err) {
                            return reject(error)
                        } else {
                            return resolve(response)                                                    
                        }
                    });
                }).then(function(re) {                   
                    for(var j=0;j < re.length;j++){
                        var d={
                            cantidad: re[j].cantidad,
                            descripcion: re[j].descripcion,
                            estadoCarga: re[j].estadoCarga,
                            fecha: re[j].fecha,
                            fechaAlta: re[j].fechaAlta,
                            formatoCarga: re[j].formatoCarga,
                            necesidad: re[j].necesidad,
                            origen: re[j].origen,
                            tipoCarga: re[j].tipoCarga,
                            destino: body.nececidades[i].localidad,
                            _id: re[j]._id
                        }
                        detalles.push(d)
                    }
                    i++;
                    getDetalles();
                }).catch(function (error) {
                    return callback(error, null)
                })
            }
            else{
                return callback(null, detalles);
            }
        }

        getDetalles();
    }
};
