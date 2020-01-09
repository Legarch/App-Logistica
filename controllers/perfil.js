var Perfil = require('../models/perfil');

module.exports = {
    new: function (req, res, next) {
        Perfil.create(req.body, function (err, response) {
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
            Perfil.update(req.body, function (err, response) {
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
    list: function (req, res, next) {
        Perfil.read(function (err, response) {
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
            Perfil.remove(req.params.id, function (err, response) {
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
    get: function (req, res, next) {
        if (!req.params.id) {
            res.json(400, {
                status: "ERR",
                message: "No se especificó el ID"
            });
        } else {
            Perfil.get(req.params.id, function (err, response) {
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
    }
};