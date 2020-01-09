'use strict';

var urlServer = ipadress + '/rest';
/*Modulos de Proyeccion*/
var app = angular.module('sartWeb', [
    'ngResource',
    'ngRoute',
    'ngCookies',
    'simplePagination',
]);

app.config(function ($routeProvider) {
    $routeProvider        
        .when('/usuarios', {
            templateUrl: 'views/usuarios.html',
            controller: 'UsuarioCtrl',
            access: {
                requiredLogin: true
            }
        })
        .when('/cliente', {
            templateUrl: 'views/clientes.html',
            controller: 'ClienteCtrl',
            access: {
                requiredLogin: true
            }
        })
        .when('/estadoCarga', {
            templateUrl: 'views/estado-carga.html',
            controller: 'EstadoCargaCtrl',
            access: {
                requiredLogin: true
            }
        })
        .when('/estadoTransito', {
            templateUrl: 'views/estado-transito.html',
            controller: 'EstadoTransitoCtrl',
            access: {
                requiredLogin: true
            }
        })
        /*Carga de formatos */
        .when('/formatoCarga', {
            templateUrl: 'views/formato-carga.html',
            controller: 'FormatoCargaCtrl',
            access: {
                requiredLogin: true
            }
        })
        .when('/localidad', {
            templateUrl: 'views/localidades.html',
            controller: 'LocalidadCtrl',
            access: {
                requiredLogin: true
            }
        })
        /*Carga de obra */
        .when('/obra', {
            templateUrl: 'views/obras.html',
            controller: 'ObraCtrl',
            access: {
                requiredLogin: true
            }
        })
        .when('/perfil', {
            templateUrl: 'views/perfiles.html',
            controller: 'PerfilCtrl',
            access: {
                requiredLogin: true
            }
        })
        .when('/provincia', {
            templateUrl: 'views/provincias.html',
            controller: 'ProvinciaCtrl',
            access: {
                requiredLogin: true
            }
        })
        .when('/tipoCarga', {
            templateUrl: 'views/tipo-carga.html',
            controller: 'TipoCargaCtrl',
            access: {
                requiredLogin: true
            }
        })
        .when('/transporte', {
            templateUrl: 'views/transportes.html',
            controller: 'TransporteCtrl',
            access: {
                requiredLogin: true
            }
        })
        .when('/necesidades', {
            templateUrl: 'views/necesidades.html',
            controller: 'NecesidadCtrl',
            access: {
                requiredLogin: true
            }
        })
        .when('/hojaRuta', {
            templateUrl: 'views/hoja-ruta.html',
            controller: 'HojaRutaCtrl',
            access: {
                requiredLogin: true
            }
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController',
            access: {
                requiredLogin: false
            }
        })
        .when('/user', {
            templateUrl: 'views/user.html',
            controller: 'UserCtrl',
            access: {
                requiredLogin: true
            }
        })
        .otherwise({
            redirectTo: '/login'
        });
});

app.run(['$rootScope', '$window', '$location', 'AuthenticationFactory', 'usuario', '$cookies', 'perfil',
    function($rootScope, $window, $location, AuthenticationFactory, usuario, $cookies, perfil) {
    
    /* Cuando la pagina se refresca, verificar que el usuario todavia esta logeado */
    AuthenticationFactory.check();

    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
        if ((nextRoute.access && nextRoute.access.requiredLogin) && !AuthenticationFactory.isLogged) {
            $location.path("/login");
        }
    });

    $rootScope.$on('$routeChangeSuccess', function(event, nextRoute, currentRoute) {
        $rootScope.showMenu = AuthenticationFactory.isLogged;
        /* Si el usuario todavia esta logeado, llevarlo a la home */
        if (AuthenticationFactory.isLogged == true && $location.path() == '/login') {
            $location.path('/');
        }
        /* Traer los datos del usuario logueado */
        var idUser = $cookies.get('user');
        if(idUser){
            usuario.get(idUser).success(function(data){
                if(data.data._id){
                    $rootScope.user = data.data;                        
                }                        
            })
        }    
    });
}]);
