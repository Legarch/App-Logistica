var NecesidadCarga = require('../models/necesidadCarga');
var NecesidadCargaDetalle = require('../models/necesidadCargaDetalle');
var HojaRuta = require('../models/hojaRuta');

module.exports = {
    new: function (req, res, next) {
        NecesidadCargaDetalle.create(req.body, function (err, response) {
            if (err) {
                res.json({
                    status: "ERR",
                    message: "Ha ocurrido un error",
                    error: err
                });
            } else {
                res.json({
                    status: "OK",
                    id: response._id,
                    data: response,
                    message: "Se ha guardado con éxito"
                });
            }
        });

    },

    update: function (req, res, next) {
        if (!req.body._id) {
            res.json(400, {
                status: "ERR",
                message: "No se especificó el ID a modificar"
            });
        } else {
            NecesidadCargaDetalle.update(req.body, function (err, response) {
                if (err) {
                    res.json({
                        status: "ERR",
                        message: "Ha ocurrido un error",
                        error: err
                    });
                } else {
                    res.json({
                        status: "OK",
                        message: "Se ha actualizado con éxito",
                        data: req.body
                    });
                }
            });
        }
    },
    list: function (req, res, next) {
        NecesidadCargaDetalle.read(function (err, response) {
            if (err) {
                res.json({
                    status: "ERR",
                    message: "Ha ocurrido un error",
                    error: err
                });
            } else {
                res.json({
                    status: "OK",
                    data: response
                });
            }
        });
    },
    delete: function (req, res, next) {
        if (!req.params.id) {
            res.json(400, {
                status: "ERR",
                message: "No se especificó el ID a eliminar"
            });
        } else {        
            var ObjectId = require('mongoose').Types.ObjectId;
            var id = new ObjectId(req.params.id);         
            //Traemos la hoja de ruta en la que se encuentra el detalle   
            HojaRuta.getHojaByNecesidadDetalle(id,function(err,resp){
                var permiteDelete = false;
                if(err){
                    res.json({
                        status: "ERR",
                        message: "Ha ocurrido un error",
                        error: err
                    });
                }
                else{
                    if(resp && resp.detalle.length > 0){
                        res.json({
                            status: "ERR",
                            code: 400,
                            message: "No es posible eliminar el detalle ya que se encuentra en una hoja de ruta."
                        });        
                    }
                    else{
                        NecesidadCargaDetalle.remove(req.params.id, function (err, response) {
                            if (err) {
                                res.json({
                                    status: "ERR",
                                    message: "Ha ocurrido un error",
                                    error: err
                                });
                            } else {
                                NecesidadCarga.get(req.params.idNecesidad, function(error,necesidad){
                                    if(error){
                                        res.json({
                                            status: "ERR",
                                            message: "Ha ocurrido un error",
                                            error: err
                                        });
                                    }
                                    else{
                                        necesidad.cantidad--;
                                        NecesidadCarga.update(necesidad, function (err, response) {
                                            if (err) {
                                                res.json({
                                                    status: "ERR",
                                                    message: "Ha ocurrido un error",
                                                    error: err
                                                });
                                            } else {
                                                res.json({
                                                    status: "OK",
                                                    message: "Se ha eliminado con éxito",
                                                    data: necesidad
                                                });                                          
                                            }
                                        });            
                                    }
                                })
                            }
                        });
                    }                    
                }
            })                               
        }
    },
    get: function (req, res, next) {
        if (!req.params.id) {
            res.json(400, {
                status: "ERR",
                message: "No se especificó el ID"
            });
        } else {
            NecesidadCargaDetalle.get(req.params.id, function (err, response) {
                if (err) {
                    res.json({
                        status: "ERR",
                        message: "Ha ocurrido un error",
                        error: err
                    });
                } else {
                    res.json({
                        status: "OK",
                        data: response
                    });
                }
            });
        }
    },


    getDetallesDisponibles: function (req, res, next) {
        NecesidadCarga.getDisponibles(function (err, response) {
            if (err) {
                res.json({
                    status: "ERR",
                    message: "Ha ocurrido un error",
                    error: err
                });
            }
            else {
                var body = {
                    nececidades: []
                }
                for (var i = 0; i < response.length; i++) {
                   body.nececidades.push({_id: response[i]._id, localidad: response[i].localidad})
                }
                NecesidadCargaDetalle.getByNecesidades(body, function (err, resp) {
                    if (err) {
                        res.json({
                            status: "ERR",
                            message: "Ha ocurrido un error",
                            error: err
                        });
                    } else {                        
                        var detallesDisponibles = [];
                        HojaRuta.getDetallesHojaRuta(function (err2, response2) {
                            if (err2) {
                                res.json({
                                    status: "ERR",
                                    message: "Ha ocurrido un error",
                                    error: err2
                                });
                            }
                            else {
                                for (var i = 0; i < resp.length; i++) {
                                    var existe = false;
                                    for (var j = 0; j < response2.length; j++) {                                       
                                        if (resp[i]._id.equals(response2[j].necesidadDetalle)) {                                                                                    
                                            existe = true;
                                        }
                                    }
                                    if (!existe) {                                        
                                        detallesDisponibles.push(resp[i]);
                                    }
                                }
                                res.json({
                                    status: "OK",
                                    data: detallesDisponibles
                                });
                            }
                        })                        
                    }
                });
            }
        })
    },

    getVariousDetails: function (req, res, next) { //Detalles disponibles y detalles de una hoja
        NecesidadCarga.getDisponibles(function (err, response) {
            if (err) {
                res.json({
                    status: "ERR",
                    message: "Ha ocurrido un error",
                    error: err
                });
            }
            else {
                var body = {
                    nececidades: []
                }
                for (var i = 0; i < response.length; i++) {
                   body.nececidades.push({_id: response[i]._id, localidad: response[i].localidad})
                }
                NecesidadCargaDetalle.getByNecesidades(body, function (err, resp) {
                    if (err) {
                        res.json({
                            status: "ERR",
                            message: "Ha ocurrido un error",
                            error: err
                        });
                    } else {                        
                        var detallesDisponibles = [];
                        HojaRuta.getDetallesHojaRuta(function (err2, response2) {
                            if (err2) {
                                res.json({
                                    status: "ERR",
                                    message: "Ha ocurrido un error",
                                    error: err2
                                });
                            }
                            else {
                                for (var i = 0; i < resp.length; i++) {
                                    var existe = false;
                                    for (var j = 0; j < response2.length; j++) {                                    
                                        if (resp[i]._id.equals(response2[j].necesidadDetalle) && (response2[j].idHoja != req.params.idHoja) ) {                                                                                    
                                            existe = true;
                                        }
                                    }
                                    if (!existe) {                                        
                                        detallesDisponibles.push(resp[i]);
                                    }
                                }
                                res.json({
                                    status: "OK",
                                    data: detallesDisponibles
                                });
                            }
                        })                        
                    }
                });
            }
        })
    },

    getByNecesidad: function (req, res, next) {
        if (!req.params.id) {
            res.json(400, {
                status: "ERR",
                message: "No se especificó el ID"
            });
        } else {
            NecesidadCargaDetalle.getByNecesidad(req.params.id, function (err, response) {
                if (err) {
                    res.json({
                        status: "ERR",
                        message: "Ha ocurrido un error",
                        error: err
                    });
                } else {
                    res.json({
                        status: "OK",
                        data: response
                    });
                }
            });
        }
    },
};