var NecesidadCarga = require('../models/necesidadCarga');
var HojaRuta = require('../models/hojaRuta');

module.exports = {
    new: function (req, res, next) {
        NecesidadCarga.create(req.body, function (err, response) {
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
            NecesidadCarga.update(req.body, function (err, response) {
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
        NecesidadCarga.read(function (err, response) {
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
            HojaRuta.getHojaByNecesidad(req.params.id, function(err,resp){
                if (err) {
                    res.json({
                        status: "ERR",
                        message: "Ha ocurrido un error",
                        error: err
                    });
                } else {
                    if(resp && resp.length > 0){
                        res.json({
                            status: "ERR",
                            code: 400,
                            message: "No es posible eliminar la necesidad ya que hay detalles en una hoja de ruta."
                        });   
                    }
                    else{
                        NecesidadCarga.remove(req.params.id, function (err, response) {
                            if (err) {
                                res.json({
                                    status: "ERR",
                                    message: "Ha ocurrido un error",
                                    error: err
                                });
                            } else {
                                res.json({
                                    status: "OK",
                                    message: "Se ha eliminado con éxito"
                                });
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
            NecesidadCarga.get(req.params.id, function (err, response) {
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

    removeDetalle: function (req, res, next) {
        if (!req.params.id || !req.body) {
            res.json(400, {
                status: "ERR",
                message: "No se especificó el ID a eliminar"
            });
        } else {
            var necesidad = req.body;
            for(var i=0;i < necesidad.detalle.length;i++){
                if(req.params.id == necesidad.detalle[i]._id){
                    necesidad.detalle.splice(i,1);
                }
            }
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
    },

    getDetallesDisponibles: function(req, res, next){
        NecesidadCarga.getDisponibles(function(err,response){
            if(err){
                res.json({
                    status: "ERR",
                    message: "Ha ocurrido un error",
                    error: err
                });
            }
            else{
                var detallesDisponibles = [];
                HojaRuta.getDetallesHojaRuta(function(err2,response2){
                    if(err2){
                        res.json({
                            status: "ERR",
                            message: "Ha ocurrido un error",
                            error: err2
                        });
                    }
                    else{                                      
                        for(var i=0;i< response.length;i++){
                            var existe = false;
                            for(var j=0; j < response2.length;j++){
                                if(response[i]._id === response2[j].necesidadDetalle._id){
                                    existe = true;                                    
                                }
                            }
                            if(!existe){
                                detallesDisponibles.push(response[i]);
                            }
                        }
                        res.json({
                            status: "OK",
                            data: detallesDisponibles
                        });
                    }
                })
                
            }
        })
    }
};