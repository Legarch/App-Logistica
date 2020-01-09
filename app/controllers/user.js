'use strict';

var app = angular.module('sartWeb');

app.controller('UserCtrl', function ($scope, $rootScope,usuario, $cookies) {

    var idUser = $cookies.get('user');
        if(idUser){
            usuario.get(idUser).success(function(data){
                if(data.data._id){
                    $scope.usuario = data.data;                        
                }                        
            })
    } 
    
    //Toast sweet alert
    $scope.toast = swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    });

    //Sweet alert
    $scope.swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
    })

    $scope.showPassword = function(){
        var x = document.getElementById("inputPass");
        if (x.type === "password") {
            $scope.showPass= true;
            x.type = "text";
        } else {
            $scope.showPass= false;
            x.type = "password";
        }
    }

    $scope.save= function(){
        usuario.update($scope.usuario).success(function(data){
            usuario.get($scope.usuario._id).success(function(data1){
                $rootScope.user = data1.data;
                $scope.toast({
                    type: 'success',
                    title: 'Datos almacenados'
                })
            })
        })                     
    }

});