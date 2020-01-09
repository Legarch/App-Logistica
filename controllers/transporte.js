'use strict';

var app = angular.module('sartWeb');

app.controller('TransporteCtrl', function ($scope, $rootScope,transporte, Pagination) {

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

    transporte.getAll().success(function(data){
        $scope.transportes = data.data;
        $scope.getPage(data.data)
    });

    $scope.new = function(){
        $scope.transporte = {};
    }

    $scope.save= function(){
        if(!$scope.transporte._id){
            transporte.save($scope.transporte).success(function(data){
                transporte.getAll().success(function(data1){
                    $scope.transportes = data1.data;
                    $scope.getPage($scope.transportes)
                    $scope.transporte = null;
                    $scope.toast({
                        type: 'success',
                        title: 'Datos almacenados'
                    })
                });
            });
        }
        else{
            transporte.update($scope.transporte).success(function(data){
                transporte.getAll().success(function(data1){
                    $scope.getPage($scope.transportes)
                    $scope.transportes = data1.data;
                    $scope.transporte = null;
                    $scope.toast({
                        type: 'success',
                        title: 'Datos almacenados'
                    })
                });
            })
        }
    }

    $scope.edit = function(u){
        $scope.transporte = u;
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
                transporte.remove(u._id).success(function(data){
                    transporte.getAll().success(function(data1){
                        $scope.transportes = data1.data;
                        $scope.getPage($scope.transportes)
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
        $scope.transporte = null;
    }

});