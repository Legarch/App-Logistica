'use strict';

var app = angular.module('sartWeb');

app.controller('ObraCtrl', function ($scope, $rootScope,obra, cliente, localidad, Pagination) {

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

    localidad.getAll().success(function(data){
        $scope.localidades = data.data;
    })

    cliente.getAll().success(function(data){
        $scope.clientes = data.data;
    })

    obra.getAll().success(function(data){
        $scope.obras = data.data;
        $scope.getPage($scope.obras)
    });

    $scope.new = function(){
        $scope.obra = {};
    }

    $scope.save= function(){
        if(!$scope.obra._id){
            obra.save($scope.obra).success(function(data){
                obra.getAll().success(function(data1){
                    $scope.obras = data1.data;
                    $scope.getPage($scope.obras)
                    $scope.obra = null;
                    $scope.toast({
                        type: 'success',
                        title: 'Datos almacenados'
                    })
                });
            });
        }
        else{
            obra.update($scope.obra).success(function(data){
                obra.getAll().success(function(data1){
                    $scope.obras = data1.data;
                    $scope.getPage($scope.obras)
                    $scope.obra = null;
                    $scope.toast({
                        type: 'success',
                        title: 'Datos almacenados'
                    })
                });
            })
        }
    }

    $scope.edit = function(u){
        $scope.obra = u;
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
                obra.remove(u._id).success(function(data){
                    obra.getAll().success(function(data1){
                        $scope.obras = data1.data;
                        $scope.getPage($scope.obras)
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
        $scope.obra = null;
    }

    $scope.getNameCliente = function(id){
        for(var i =0; i< $scope.clientes.length; i++){
            if($scope.clientes[i]._id == id){
                var name = $scope.clientes[i].nombre; 
            }
        }
        if(name){
            return name;
        }
        else{
            return "Sin especificar";
        }
    }

    $scope.getLocalidad = function(id){
        for(var i =0; i< $scope.localidades.length; i++){
            if($scope.localidades[i]._id == id){
                var name = $scope.localidades[i].nombre; 
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