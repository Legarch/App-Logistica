// server.js
// FILE IMMO SERVER
// BASE
// =============================================================================

// Usamos los paquetes que necesitamos
var express = require('express'); // Llamamos a Express
var app = express(); // Definimos nuestra App usando Express
var bodyParser = require('body-parser');
var session = require('express-session');
var methodOverride = require('method-override');
//DATABASES
global.mongoose = require('mongoose');
var mysql = require('mysql');
//
var qt = require('quickthumb');
var cors = require('cors');
//Socket
var http = require('http').Server(app);
global.io = require('socket.io')(http);

global.ipadress = 'http://localhost:8000'; //fix port
var puerto = 8000;

//MONGOOSE
//====================================================
mongoose.connect('mongodb://localhost:27017/sart'); // Conexi�n a la base de datos


var passport = require('passport');
require('./server/models/usuario');
require('./server/config/passport')(passport);

//indicamos que use sessiones para almacenar el objeto usuario
//y que lo recuerde aunque abandonemos la pagina
app.use(session({
    secret: 'sart',
    resave: false,
    saveUninitialized: true
}));

// gzip/deflate outgoing responses
var compression = require('compression');
app.use(compression());

app.use(cors());

// Configuramos la app para que use bodyParser()
// Esto nos permitir� manejar peticiones POST
app.use(bodyParser.urlencoded({extended: false, limit: '100mb'}));
app.use(bodyParser.json({ limit: '15mb' }));
app.use(methodOverride());

var favicon = require('serve-favicon');
app.use(favicon(__dirname + '/front/favicon.ico'));

var port = process.env.PORT || puerto; // Indicamos el puerto que vamos a utilizar.
app.use(express.static(__dirname + '/front'));

// DEFINIMOS RUTAS Y CONTROLADORES
// =============================================================================
var router = express.Router(); // creamos una instancia del Router de Express
var usuario_controller = require('./server/controllers/usuario');
var carga_controller = require('./server/controllers/carga');
var cliente_controller = require('./server/controllers/cliente');
var estadoCarga_controller = require('./server/controllers/estadoCarga');
var estadoTransito_controller = require('./server/controllers/estadoTransito');
var formatoCarga_controller = require('./server/controllers/formatoCarga');
var hojaRuta_controller = require('./server/controllers/hojaRuta');
var localidad_controller = require('./server/controllers/localidad');
var necesidadCarga_controller = require('./server/controllers/necesidadCarga');
var necesidadCargaDetalle_controller = require('./server/controllers/necesidadCargaDetalle');
var obra_controller = require('./server/controllers/obra');
var perfil_controller = require('./server/controllers/perfil');
var provincia_controller = require('./server/controllers/provincia');
var tipoCarga_controller = require('./server/controllers/tipoCarga');
var transporte_controller = require('./server/controllers/transporte');
var reporte_controller = require('./server/controllers/reports');
var authentication = require('./server/controllers/authentication')

app.use(passport.initialize());
app.use(passport.session());

app.post('/auth/local', passport.authenticate('local', {
    successRedirect: ipadress + '/index.html',
    failureRedirect: ipadress + '/error.html'
}));


//Autenticacion para el panel
/* app.get("*", requiredAuth, function(request, response, next) {
    next();
});
 */
//USUARIO REST
router.route('/usuario')
    .get(usuario_controller.listUsuario)
    .post(usuario_controller.newUsuario)
    .put(usuario_controller.updateUsuario);
router.route('/usuario/:id').delete(usuario_controller.deleteUsuario);
router.route('/usuario/login/:user/:pass').get(usuario_controller.login);
router.route('/usuario/register').post(usuario_controller.register);
router.route('/usuario/getByName').post(usuario_controller.getByName);
router.route('/usuario/get/:id').get(usuario_controller.get);

//CARGA REST
router.route('/carga')
    .get(carga_controller.list)
    .post(carga_controller.new)
    .put(carga_controller.update);
router.route('/carga/:id').delete(carga_controller.delete);
router.route('/carga/get/:id').get(carga_controller.get);

//CLIENTE REST
router.route('/cliente')
    .get(cliente_controller.list)
    .post(cliente_controller.new)
    .put(cliente_controller.update);
router.route('/cliente/:id').delete(cliente_controller.delete);
router.route('/cliente/get/:id').get(cliente_controller.get);

//ESTADO CARGA REST
router.route('/estadoCarga')
    .get(estadoCarga_controller.list)
    .post(estadoCarga_controller.new)
    .put(estadoCarga_controller.update);
router.route('/estadoCarga/:id').delete(estadoCarga_controller.delete);
router.route('/estadoCarga/get/:id').get(estadoCarga_controller.get);

//ESTADO TRANSITO REST
router.route('/estadoTransito')
    .get(estadoTransito_controller.list)
    .post(estadoTransito_controller.new)
    .put(estadoTransito_controller.update);
router.route('/estadoTransito/:id').delete(estadoTransito_controller.delete);
router.route('/estadoTransito/get/:id').get(estadoTransito_controller.get);

//FORMATO CARGA REST
router.route('/formatoCarga')
    .get(formatoCarga_controller.list)
    .post(formatoCarga_controller.new)
    .put(formatoCarga_controller.update);
router.route('/formatoCarga/:id').delete(formatoCarga_controller.delete);
router.route('/formatoCarga/get/:id').get(formatoCarga_controller.get);

//HOJA RUTA REST
router.route('/hojaRuta')
    .get(hojaRuta_controller.list)
    .post(hojaRuta_controller.new)
    .put(hojaRuta_controller.update);
router.route('/hojaRuta/:id').delete(hojaRuta_controller.delete);
router.route('/hojaRuta/get/:id').get(hojaRuta_controller.get);
router.route('/hojaRuta/removeDetail/:id/:idDetail').get(hojaRuta_controller.removeDetail);
router.route('/updateEstadoTransito').put(hojaRuta_controller.updateEstadoTransito);

//LOCALIDAD REST
router.route('/localidad')
    .get(localidad_controller.list)
    .post(localidad_controller.new)
    .put(localidad_controller.update);
router.route('/localidad/:id').delete(localidad_controller.delete);
router.route('/localidad/get/:id').get(localidad_controller.get);

//NECESIDAD CARGA REST
router.route('/necesidadCarga')
    .get(necesidadCarga_controller.list)
    .post(necesidadCarga_controller.new)
    .put(necesidadCarga_controller.update);
router.route('/necesidadCarga/:id').delete(necesidadCarga_controller.delete);
router.route('/necesidadCarga/get/:id').get(necesidadCarga_controller.get);
router.route('/necesidadCarga/deleteDetalle/:id').put(necesidadCarga_controller.removeDetalle);

//NECESIDAD CARGA DETALLE REST
router.route('/necesidadCargaDetalle')
    .get(necesidadCargaDetalle_controller.list)
    .post(necesidadCargaDetalle_controller.new)
    .put(necesidadCargaDetalle_controller.update);
router.route('/necesidadCargaDetalle/:id/:idNecesidad').delete(necesidadCargaDetalle_controller.delete);
router.route('/necesidadCargaDetalle/get/:id').get(necesidadCargaDetalle_controller.get);
router.route('/necesidadCargaDetalle/getByNecesidad/:id').get(necesidadCargaDetalle_controller.getByNecesidad);
router.route('/necesidadCargaDetalle/getDetallewithoutUsing').get(necesidadCargaDetalle_controller.getDetallesDisponibles);
router.route('/necesidadCargaDetalle/getVariousDetails/:idHoja').get(necesidadCargaDetalle_controller.getVariousDetails);

//OBRA REST
router.route('/obra')
    .get(obra_controller.list)
    .post(obra_controller.new)
    .put(obra_controller.update);
router.route('/obra/:id').delete(obra_controller.delete);
router.route('/obra/get/:id').get(obra_controller.get);

//PERFIL REST
router.route('/perfil')
    .get(perfil_controller.list)
    .post(perfil_controller.new)
    .put(perfil_controller.update);
router.route('/perfil/:id').delete(perfil_controller.delete);
router.route('/perfil/get/:id').get(perfil_controller.get);

//PROVINCIA REST
router.route('/provincia')
    .get(provincia_controller.list)
    .post(provincia_controller.new)
    .put(provincia_controller.update);
router.route('/provincia/:id').delete(provincia_controller.delete);
router.route('/provincia/get/:id').get(provincia_controller.get);

//TIPO CARGA REST
router.route('/tipoCarga')
    .get(tipoCarga_controller.list)
    .post(tipoCarga_controller.new)
    .put(tipoCarga_controller.update);
router.route('/tipoCarga/:id').delete(tipoCarga_controller.delete);
router.route('/tipoCarga/get/:id').get(tipoCarga_controller.get);

//TRANSPORTE REST
router.route('/transporte')
    .get(transporte_controller.list)
    .post(transporte_controller.new)
    .put(transporte_controller.update);
router.route('/transporte/:id').delete(transporte_controller.delete);
router.route('/transporte/get/:id').get(transporte_controller.get);

//REPORTES
router.route('/reporte/hojaRuta/:id')
    .get(reporte_controller.reportHojaRuta)
//Login
router.route('/auth').post(authentication.login);



//LOGIN CON PASSPORT=============================================

router.route('/islogged').get(
    function (req, res) {
        res.json(req.user);
    }
);

router.route('/admin/logout').get(function (req, res, next) {
    req.logout();
    res.redirect(ipadress + '/login.html');
});

//Verifica si la session existe!.
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
}
//===================================================================
app.use('/rest', router);


//CONECTION
//===================================================================
http.listen(puerto, function () {
    console.log(new Date() + ' Server iniciado: ' + ipadress);
});
//===================================================================
