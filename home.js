'use strict';

var app = angular.module('sartWeb');

app.controller('HomeCtrl', function ($scope, $rootScope, usuario, $sce,perfil ) {

    $rootScope.isLogged = false;
    // $rootScope.perfil = {administrador:true, sistema:true, coordinador:false, monitor: false};
    usuario.isLogged().success(function (response) {
         if (response) {
             $rootScope.user = response;
             perfil.get($rootScope.user.perfil).success(function (data) {
                 $rootScope.perfil = data.data;
             });
             $rootScope.isLogged = true;

         } else {
             $rootScope.user = null;
             $rootScope.isLogged = false;
             $location.path('/login');
         }
    }).error(function () {
         $rootScope.user = null;
         $rootScope.isLogged = false;
         $location.path('/login');
    });

    $scope.goEditar = function() {
        $location.path('/usuario')
    };

    $scope.ipLogin = $sce.trustAsResourceUrl(ipadress + '/auth/local');

});