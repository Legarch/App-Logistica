'use strict';

var app = angular.module('sartWeb');

app.controller('MenuCtrl', function ($scope, $rootScope, $location, $cookies, perfil, usuario) {
   

    $scope.goPerfiles = function () {
        $location.path("/perfil");
    };

    $scope.goUsuarios = function () {
        $location.path("/usuarios");
    };

    $scope.goCliente = function () {
        $location.path("/cliente");
    };

    $scope.goEstadoCarga = function () {
        $location.path("/estadoCarga");
    };

    $scope.goEstadoTransito = function () {
        $location.path("/estadoTransito");
    };

    $scope.goFormatoCarga = function () {
        $location.path("/formatoCarga");
    };

    $scope.goObra = function () {
        $location.path("/obra");
    };

    $scope.goLocalidad = function () {
        $location.path("/localidad");
    };

    $scope.goProvincia = function () {
        $location.path("/provincia");
    };

    $scope.goTipoCarga = function () {
        $location.path("/tipoCarga");
    };

    $scope.goTransporte = function () {
        $location.path("/transporte");
    };

    $scope.goNecesidades = function () {
        $location.path("/necesidades");
    };

    $scope.goHojasRuta = function(){
        $location.path("/hojaRuta")
    }
    setTimeout(function(){
        $('ul.sidebar-menu').tree();
    },1)

});
