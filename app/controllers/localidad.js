'use strict';

var app = angular.module('sartWeb');

app.controller('LocalidadCtrl', function ($scope, $rootScope,localidad, provincia, Pagination) {

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

    provincia.getAll().success(function(data){
        $scope.provincias = data.data;
    });

    localidad.getAll().success(function(data){
        $scope.localidades = data.data;
        $scope.getPage($scope.localidades)
    });


    $scope.new = function(){
        $scope.localidad = {};
    }

    $scope.save= function(){
        if(!$scope.localidad._id){
            localidad.save($scope.localidad).success(function(data){
                localidad.getAll().success(function(data1){
                    $scope.localidades = data1.data;
                    $scope.getPage($scope.localidades)
                    $scope.localidad = null;
                    $scope.toast({
                        type: 'success',
                        title: 'Datos almacenados'
                    })
                });
            });
        }
        else{
            localidad.update($scope.localidad).success(function(data){
                localidad.getAll().success(function(data1){
                    $scope.localidades = data1.data;
                    $scope.getPage($scope.localidades)
                    $scope.localidad = null;
                    $scope.toast({
                        type: 'success',
                        title: 'Datos almacenados'
                    })
                });
            })
        }
    }

    $scope.edit = function(u){
        $scope.localidad = u;
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
                localidad.remove(u._id).success(function(data){
                    localidad.getAll().success(function(data1){
                        $scope.localidades = data1.data;
                        $scope.getPage($scope.localidades)
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
        $scope.localidad = null;
    }

    $scope.getProvincia = function(id){
        for(var i =0; i< $scope.provincias.length; i++){
            if($scope.provincias[i]._id == id){
                var name = $scope.provincias[i].nombre; 
            }
        }
        if(name){
            return name;
        }
        else{
            return "Sin especificar";
        }
    }
});