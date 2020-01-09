var Usuario = require('../models/usuario');

module.exports = {
    newUsuario: function (req, res, next) {
        Usuario.create(req.body, function (err, response) {
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
    register: function (req, res, next) {
        Usuario.checkUsername(req.body, function (err, respuesta) {
            if (!respuesta) {
                Usuario.create(req.body, function (err, response) {
                    if (err) {
                        res.json({
                            status: "ERR",
                            message: "Ha ocurrido un error",
                            error: err
                        });
                    } else {
                        res.json({
                            status: "OK",
                            tipo: 1,
                            message: "Se ha creado con éxito"
                        });
                    }
                });
            } else {
                res.json({
                    status: "ERR",
                    message: "Usuario ya existe",
                    error: err
                });
            }
        });
    },

    updateUsuario: function (req, res, next) {
        if (!req.body._id) {
            res.json(400, {
                status: "ERR",
                message: "No se especificó el ID a modificar"
            });
        } else {
            Usuario.update(req.body, function (err, response) {
                if (err) {
                    res.json({
                        status: "ERR",
                        message: "Ha ocurrido un error",
                        error: err
                    });
                } else {
                    res.json({
                        status: "OK",
                        message: "Se ha actualizado con éxito"
                    });
                }
            });
        }
    },
    listUsuario: function (req, res, next) {
        Usuario.read(function (err, response) {
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
    deleteUsuario: function (req, res, next) {
        if (!req.params.id) {
            res.json(400, {
                status: "ERR",
                message: "No se especificó el ID a eliminar"
            });
        } else {
            Usuario.remove(req.params.id, function (err, response) {
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
    },
    login: function (req, res, next) {
        Usuario.login(req.params.user, req.params.pass, function (err, response) {
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
    getByName: function (req, res, next) {
        Usuario.getByName(req.body, function (err, response) {
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
    get: function (req, res, next) {
        if (!req.params.id) {
            res.json(400, {
                status: "ERR",
                message: "No se especificó el ID a eliminar"
            });
        } else {
            Usuario.get(req.params.id, function (err, response) {
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