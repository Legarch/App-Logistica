var mongoose = require('mongoose');
var User = mongoose.model('Usuario');

var LocalStrategy = require('passport-local').Strategy;

// Exportamos como módulo las funciones de passport, de manera que
// podamos utilizarlas en otras partes de la aplicación.
// De esta manera, mantenemos el código separado en varios archivos
// logrando que sea más manejable.
module.exports = function (passport) {

    // Serializa al usuario para almacenarlo en la sesión
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    // Deserializa el objeto usuario almacenado en la sesión para
    // poder utilizarlo
    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });

    //Configuracion de autenticado local
    passport.use(new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password'
        },
        function (username, password, done) {
            User.findOne({
                username: username
            }, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {
                        message: 'Usuario incorrecto.'
                    });
                }
                if (!user.validPassword(password)) {
                    return done(null, false, {
                        message: 'Contraseña incorrecta.'
                    });
                }

                return done(null, user);
            });
        }
    ));

   

};