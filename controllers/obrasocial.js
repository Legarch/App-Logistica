var Obra = require('../models/obra');

module.exports = {
    new: function (req, res, next) {
        Obra.create(req.body, function (err, response) {
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
            Obra.update(req.body, function (err, response) {
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
        Obra.read(function (err, response) {
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
            Obra.remove(req.params.id, function (err, response) {
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
            Obra.get(req.params.id, function (err, response) {
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