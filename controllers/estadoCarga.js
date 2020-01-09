'use strict';

var app = angular.module('sartWeb');

app.controller('EstadoCargaCtrl', function ($scope, $rootScope,estadoCarga, Pagination) {

    //Manteniendo sweet alert
    $scope.toast = swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    });
    // Configurando Sweet alert
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

    estadoCarga.getAll().success(function(data){
        $scope.estadosCarga = data.data;
        $scope.getPage($scope.estadosCarga)
    });

    $scope.new = function(){
        $scope.estCarga = {};
    }

    $scope.save= function(){
        if(!$scope.estCarga._id){
            var existeDefault = false;
            var estadoFinal = false;
            for(var i =0; i < $scope.estadosCarga.length;i++){
                if($scope.estadosCarga[i].default && $scope.estCarga.default){
                    existeDefault = true;
                }
                if($scope.estadosCarga[i].estadoFinal && $scope.estCarga.estadoFinal){
                    estadoFinal = true;
                }
            }
            if(existeDefault || estadoFinal){
                $scope.swalWithBootstrapButtons(
                    'Error al guardar',
                    'Ya existe un estado de carga seleccionado por defecto o marcado como estado final',
                    'error'
                )
            }
            else{
                if($scope.estCarga.default && $scope.estCarga.estadoFinal){
                    $scope.swalWithBootstrapButtons(
                        'Error al guardar',
                        'No se puede guardar el estado como POR DEFECTO y ESTADO FINAL',
                        'error'
                    )
                }
                else{
                    estadoCarga.save($scope.estCarga).success(function(data){
                        estadoCarga.getAll().success(function(data1){
                            $scope.estadosCarga = data1.data;
                            $scope.getPage($scope.estadosCarga)
                            $scope.estCarga = null;
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
            var estadoFinal = false;
            for(var i =0; i < $scope.estadosCarga.length;i++){
                if($scope.estCarga.default && $scope.estadosCarga[i].default && $scope.estCarga._id != $scope.estadosCarga[i]._id){
                    existeDefault = true;
                }
                if($scope.estadosCarga[i].estadoFinal && $scope.estCarga.estadoFinal){
                    estadoFinal = true;
                }
            }
            if(existeDefault && estadoFinal){
                $scope.swalWithBootstrapButtons(
                    'Error al guardar',
                    'Ya existe un estado de carga seleccionado por defecto o marcado como estado final',
                    'error'
                )
            }
            else{
                if($scope.estCarga.default && $scope.estCarga.estadoFinal){
                    $scope.swalWithBootstrapButtons(
                        'Error al guardar',
                        'No se puede guardar el estado como POR DEFECTO y ESTADO FINAL',
                        'error'
                    )
                }
                else{
                    estadoCarga.update($scope.estCarga).success(function(data){
                        estadoCarga.getAll().success(function(data1){
                            $scope.estadosCarga = data1.data;
                            $scope.getPage($scope.estadosCarga)
                            $scope.estCarga = null;
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
        $scope.estCarga = u;
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
                estadoCarga.remove(u._id).success(function(data){
                    estadoCarga.getAll().success(function(data1){
                        $scope.estadosCarga = data1.data;
                        $scope.getPage($scope.estadosCarga)
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
        estadoCarga.getAll().success(function(data){
            $scope.estadosCarga = data.data;
            $scope.getPage($scope.estadosCarga)
            $scope.estCarga = null;
        });        
    }

});