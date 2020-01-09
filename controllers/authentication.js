'use strict';

var express = require('express');
var jwt = require('jsonwebtoken');

var models  = require('../models/usuario');
var config  = require('../../config');

var User    = models;

/* Autenticar un usuario */
module.exports = {
    login : function(request,response){
        var username = request.body.user || '';
        var password = request.body.pass || '';
    
        if(username && password) {
            User.login(request.body, function(error, user) {
                if(error) {
                    return response.status(500).json({
                        success: false,
                        message: 'Error al obtener el usuario: ' + error
                    });
                }
    
                if(!user) {
                    response.status(400).json({ success: false, message: 'E-mail y/o password incorrectos' });
                } else {
                    var token = jwt.sign(user.toJSON(), config.key, {
                        expiresIn: '80000000m' /* 540 minutes = 9 hours */
                    });
    
                    response.status(200).json({
                        success: true,
                        token: token,
                        data: user
                    });
                }
            });
        } else {
            response.status(400).json({
                success: false,
                message: 'Verifique los datos del usuario'
            });
        }
    }
}