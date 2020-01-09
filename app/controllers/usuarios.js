'use strict';

var app = angular.module('sartWeb');

app.controller('UsuarioCtrl', function ($scope, $rootScope,usuario,perfil, Pagination) {

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

    $scope.pagination = {
        items: [],
        currentPage: 1,
        numberPerPages: 8,
        maxPages: 5
    };

    $scope.getPage = function(t){
        var numberPage = Math.ceil(t.length / $scope.pagination.numberPerPages);
        $scope.pages= [];
        for(var i=0; i< numberPage;i++){
            $scope.pages.push(i+1);
        }
        return $scope.pages;
    }

    $scope.changePage = function(p){
        $scope.pagination.currentPage = p;
    }

    $scope.filtering = function(){
        if($scope.textFilter.length > 0){
            $scope.pagination.currentPage = 1;
            $scope.pagination.numberPerPages = 10000;
        }
        else{
            $scope.pagination.numberPerPages = 8;
        }
    }

    perfil.getAll().success(function(data){
        $scope.perfiles = data.data;
    })

    usuario.getAll().success(function(data){
        $scope.usuarios = data.data;
        $scope.getPage($scope.usuarios)
    });

    $scope.new = function(){
        $scope.usuario = {};
    }

    $scope.save= function(){
        if(!$scope.usuario._id){
            usuario.save($scope.usuario).success(function(data){
                usuario.getAll().success(function(data1){
                    $scope.usuarios = data1.data;
                    $scope.getPage($scope.usuarios)
                    $scope.usuario = null;
                    $scope.toast({
                        type: 'success',
                        title: 'Datos almacenados'
                    })
                });
            });
        }
        else{
            usuario.update($scope.usuario).success(function(data){
                usuario.getAll().success(function(data1){
                    $scope.usuarios = data1.data;
                    $scope.getPage($scope.usuarios)
                    $scope.usuario = null;
                    $scope.toast({
                        type: 'success',
                        title: 'Datos almacenados'
                    })
                });
            })
        }
    }

    $scope.edit = function(u){
        $scope.usuario = u;
    }

    $scope.remove = function(u){
        $scope.swalWithBootstrapButtons({
            title: 'Atención',
            text: "Está seguro que desea eliminar?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si',
            cancelButtonText: 'No',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                usuario.remove(u._id).success(function(data){
                    usuario.getAll().success(function(data1){
                        $scope.usuarios = data1.data;
                        $scope.getPage($scope.usuarios)
                        $scope.swalWithBootstrapButtons(
                            'Eliminado!',
                            'Se ha eliminado correctamente',
                            'success'
                        )
                    });
                })
            }
        })
    }
    
    $scope.return = function(){
        $scope.usuario = null;
    }

    $scope.getPerfil = function(id){
        for(var i =0; i< $scope.perfiles.length; i++){
            if($scope.perfiles[i]._id == id){
                var name = $scope.perfiles[i].nombre; 
            }
        }
        if(name){
            return name;
        }
        else{
            return "Sin especificar";
        }
    }

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

});