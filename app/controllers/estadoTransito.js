'use strict';

var app = angular.module('sartWeb');

app.controller('EstadoTransitoCtrl', function ($scope, $rootScope,estTransito, Pagination) {

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

    estTransito.getAll().success(function(data){
        $scope.estadosTransito = data.data;
        $scope.getPage($scope.estadosTransito)
    });

    $scope.new = function(){
        $scope.estadoTransito = {};
    }

    $scope.save= function(){
        if(!$scope.estadoTransito._id){
            var existeDefault = false;
            var estadoFinal = false;
            for(var i =0; i < $scope.estadosTransito.length;i++){
                if($scope.estadosTransito[i].default && $scope.estadoTransito.default){
                    existeDefault = true;
                }
                if($scope.estadosTransito[i].estadoFinal && $scope.estadoTransito.estadoFinal){
                    estadoFinal = true;
                }
            }
            if(existeDefault || estadoFinal){
                $scope.swalWithBootstrapButtons(
                    'Error al guardar',
                    'Ya existe un estado de transito seleccionado por defecto o marcado como estado final',
                    'error'
                )
            }
            else{
                if($scope.estadoTransito.default && $scope.estadoTransito.estadoFinal){
                    $scope.swalWithBootstrapButtons(
                        'Error al guardar',
                        'No se puede guardar el estado como POR DEFECTO y ESTADO FINAL',
                        'error'
                    )
                }
                else{
                    estTransito.save($scope.estadoTransito).success(function(data){
                        estTransito.getAll().success(function(data1){
                            $scope.estadosTransito = data1.data;
                            $scope.getPage($scope.estadosTransito)
                            $scope.estadoTransito = null;
                            $scope.toast({
                                type: 'success',
                                title: 'Datos almacenados'
                            })
                        });
                    });
                }                
            } 
        }
        else{
            var existeDefault = false;
            for(var i =0; i < $scope.estadosTransito.length;i++){
                if($scope.estadoTransito.default && $scope.estadosTransito[i].default && $scope.estadoTransito._id != $scope.estadosTransito[i]._id){
                    existeDefault = true;
                }
                if($scope.estadosTransito[i].estadoFinal && $scope.estadoTransito.estadoFinal && $scope.estadoTransito._id != $scope.estadosTransito[i]._id){
                    estadoFinal = true;
                }
            }
            if(existeDefault){
                $scope.swalWithBootstrapButtons(
                    'Error al guardar',
                    'Ya existe un estado de transito seleccionado por defecto',
                    'error'
                )
            }
            if(existeDefault || estadoFinal){
                $scope.swalWithBootstrapButtons(
                    'Error al guardar',
                    'Ya existe un estado de transito seleccionado por defecto o marcado como estado final',
                    'error'
                )
            }
            else{
                if($scope.estadoTransito.default && $scope.estadoTransito.estadoFinal){
                    $scope.swalWithBootstrapButtons(
                        'Error al guardar',
                        'No se puede guardar el estado como POR DEFECTO y ESTADO FINAL',
                        'error'
                    )
                }
                else{
                    estTransito.update($scope.estadoTransito).success(function(data){
                        estTransito.getAll().success(function(data1){
                            $scope.estadosTransito = data1.data;
                            $scope.getPage($scope.estadosTransito)
                            $scope.estadoTransito = null;
                            $scope.toast({
                                type: 'success',
                                title: 'Datos almacenados'
                            })
                        });
                    })
                }                
            }            
        }
    }

    $scope.edit = function(u){
        $scope.estadoTransito = u;
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
                estTransito.remove(u._id).success(function(data){
                    estTransito.getAll().success(function(data1){
                        $scope.estadosTransito = data1.data;
                        $scope.getPage($scope.estadosTransito)
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
        estTransito.getAll().success(function(data){
            $scope.estadosTransito = data.data;
            $scope.getPage($scope.estadosTransito);
            $scope.estadoTransito = null;
        });
        
    }

});