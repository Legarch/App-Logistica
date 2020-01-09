// server/models/curso.js

// Incluímos a Mongoose para poder interactuar con MongoDB
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Creamos el Schema, que vendría a ser la estructura de cada documento
var hojaRutaSchema = new Schema({
    fechaAlta: Date,
    fechaCierre: Date,
    transporte: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transporte'
    },
    estadoCarga: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Esi'
    },
    cantidadItems: Number,
    pesoTotal: Number,
    volumenTotal: Number,
    observaciones: String,
    detalle: [
        {
            necesidadDetalle: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'NecesidadDetalle'
            },
            estadoTransito: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Eop'
            },
            observaciones: String,
            fechaSalida: Date,
            fechaLlegada: Date,
        }
    ],
    reporte:{
        exist:{
            type: Boolean,
            default: false
        },
        name: {
            type: String,
            default: ""
        }
    },
    isOpen: {
        type: Boolean,
        default: true
    }
});

// Compilamos el Schema
var HojaRuta = mongoose.model('HojaRuta', hojaRutaSchema);

// Creamos las acciones para interactuar con la base de datos
module.exports = {
    create: function (hojaRuta, callback) {
        var newObject = new HojaRuta(hojaRuta);
        newObject.save(function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                HojaRuta.findById(response._id).
                populate('transporte').
                populate('estadoCarga').
                populate({ 
                    path: 'detalle.necesidadDetalle',
                    model: 'NecesidadDetalle',
                    populate: {
                        path: 'necesidad',
                        model: 'Necesidad'
                    } 
                    
                }).
                exec(function (err, hoja) {
                    if (err) {
                        callback(err, null);
                    } else {
                        callback(null, hoja)
                    }
                });
            }
        });
    },
    read: function (callback) {
        HojaRuta.find().
        populate('transporte').
        populate('estadoCarga').
        populate({ 
            path: 'detalle.necesidadDetalle',
            model: 'NecesidadDetalle',
            populate: {
                path: 'necesidad',
                model: 'Necesidad'
            } 
        }).
        populate({ 
            path: 'detalle.necesidadDetalle',
            model: 'NecesidadDetalle',
            populate: {
                path: 'tipoCarga',
                model: 'TipoCarga'
            } 
        }).
        populate({ 
            path: 'detalle.necesidadDetalle',
            model: 'NecesidadDetalle',
            populate: {
                path: 'formatoCarga',
                model: 'FormatoCarga'
            } 
        }).
        populate('detalle.estadoTransito').
        populate({ 
            path: 'detalle.necesidadDetalle',
            model: 'NecesidadDetalle',
            populate: {
                path: 'necesidad',
                model: 'Necesidad',
                populate:{
                    path: 'localidad',
                    model: 'Localidad'
                }
            }             
        }).
        exec(function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response)
            }
        });
    },
    update: function (hojaRuta, callback) {
        HojaRuta.findByIdAndUpdate(hojaRuta._id, hojaRuta).
        populate('detalle.estadoTransito').
        exec(function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response)
            }
        });
    },
    remove: function (id, callback) {
        HojaRuta.findByIdAndRemove(id, function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response)
            }
        });
    },
    get: function (id, callback) {
        HojaRuta.findById(id).
        populate('transporte').
        populate('estadoCarga').
        populate({ 
            path: 'detalle.necesidadDetalle',
            model: 'NecesidadDetalle',
            populate: {
                path: 'necesidad',
                model: 'Necesidad'
            }             
        }).
        populate({ 
            path: 'detalle.necesidadDetalle',
            model: 'NecesidadDetalle',
            populate: {
                path: 'tipoCarga',
                model: 'TipoCarga'
            } 
        }).
        populate({ 
            path: 'detalle.necesidadDetalle',
            model: 'NecesidadDetalle',
            populate: {
                path: 'formatoCarga',
                model: 'FormatoCarga'
            } 
        }).
        populate('detalle.estadoTransito').
        populate({ 
            path: 'detalle.necesidadDetalle',
            model: 'NecesidadDetalle',
            populate: {
                path: 'necesidad',
                model: 'Necesidad',
                populate:{
                    path: 'localidad',
                    model: 'Localidad'
                }
            }             
        }).
        exec(function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, response)
            }
        });
    },
    getDetallesHojaRuta: function (callback) {
        HojaRuta.find().exec(function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                var allDetalles = [];
                for(var i =0; i< response.length;i++){
                    for(var j=0; j < response[i].detalle.length;j++){
                        allDetalles.push({
                            _id: response[i].detalle[j]._id,
                            necesidadDetalle: response[i].detalle[j].necesidadDetalle,
                            idHoja: response[i]._id
                        });
                    }
                }
                callback(null, allDetalles);
            }
        });
    },
    getHojaByNecesidadDetalle: function (id,callback) {
        HojaRuta.findOne({ 
            'detalle.necesidadDetalle': id
        }).
        populate('estadoCarga').
        populate('detalle.estadoTransito').
        exec(function (err, response) {
            if (err) {
                callback(err, null);
            } else {                
                callback(null, response);
            }
        });
    },
    getHojaByNecesidad: function (id,callback) {
        HojaRuta.find().
        populate({ 
            path: 'detalle.necesidadDetalle',
            model: 'NecesidadDetalle',
            populate: {
                path: 'necesidad',
                model: 'Necesidad'
            }             
        }).
        exec(function (err, response) {
            if (err) {
                callback(err, null);
            } else {        
                var r = []
                for(var i=0; i< response.length;i++){
                    for(var j=0; j< response[i].detalle.length;j++){
                        if(response[i].detalle[j].necesidadDetalle.necesidad._id.equals(id)){
                            r.push(response[i].detalle[j].necesidadDetalle.necesidad);
                        }
                    }
                }
                callback(null, r);
            }
        });
    }
};
