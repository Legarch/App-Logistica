'use strict';

var app = angular.module('sartWeb');

app.controller('NecesidadCtrl', function ($scope, $rootScope,necesidadCarga, obra, localidad, cliente, usuario, formatoCarga, estadoCarga, tipoCarga, Pagination, necesidadCargaDetalle) {

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
    });

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

    tipoCarga.getAll().success(function(data){
        $scope.tiposCarga = data.data;
    })

    estadoCarga.getAll().success(function(data){
        $scope.estadosCarga = data.data;
    })

    formatoCarga.getAll().success(function(data){
        $scope.formatosCarga = data.data;
    })

    usuario.getAll().success(function(data){
        $scope.usuarios = data.data;
    })

    cliente.getAll().success(function(data){
        $scope.clientes = data.data;
    })

    localidad.getAll().success(function(data){
        $scope.localidades = data.data;
    })

    obra.getAll().success(function(data){
        $scope.obras = data.data;
    })

    necesidadCarga.getAll().success(function(data){
        $scope.necesidadesCarga = data.data;
        $scope.getPage($scope.necesidadesCarga)
    });

    $scope.new = function(){
        $scope.necesidadCarga = {};
    }

    $scope.save= function(){
        if(!$scope.necesidadCarga._id){
            $scope.necesidadCarga.disponibilidadCarga = 1;
            $scope.necesidadCarga.usuario = $rootScope.user._id;
            $scope.necesidadCarga.cantidad = 0;
            necesidadCarga.save($scope.necesidadCarga).success(function(data){
                necesidadCarga.getAll().success(function(data1){
                    $scope.necesidadesCarga = data1.data;
                    $scope.getPage($scope.necesidadesCarga)
                    $scope.necesidadCarga = null;
                    $scope.toast({
                        type: 'success',
                        title: 'Datos almacenados'
                    })
                });
            });
        }
        else{
            $scope.necesidadCarga.usuario = $rootScope.user._id;
            necesidadCarga.update($scope.necesidadCarga).success(function(data){
                necesidadCarga.getAll().success(function(data1){
                    $scope.necesidadesCarga = data1.data;
                    $scope.getPage($scope.necesidadesCarga)
                    $scope.necesidadCarga = null;
                    $scope.toast({
                        type: 'success',
                        title: 'Datos almacenados'
                    })
                });
            })
        }
    }

    $scope.edit = function(u){
        $scope.necesidadCarga = u;
        if($scope.necesidadCarga.obra && $scope.necesidadCarga.obra._id != ""){
            $scope.obraSelected = $scope.necesidadCarga.obra;
        }
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
                necesidadCarga.remove(u._id).success(function(data){
                    if(data.code != 400){
                        necesidadCarga.getAll().success(function(data1){
                            $scope.necesidadesCarga = data1.data;
                            $scope.getPage($scope.necesidadesCarga)
                            $scope.swalWithBootstrapButtons(
                                'Eliminado!',
                                'Se ha eliminado correctamente',
                                'success'
                            )
                        });
                    }
                    else{
                        $scope.swalWithBootstrapButtons(
                            'Error!',
                            ''+ data.message,
                            'error'
                        )
                    }
                })
            }
        })
    }

    $scope.return = function(){
        $scope.necesidadCarga = null;
        $scope.obraSelected = null;
        necesidadCarga.getAll().success(function(data){
            $scope.necesidadesCarga = data.data;
            $scope.getPage($scope.necesidadesCarga)
        });
    }

    $scope.changeObra = function(id){
        if(id && id != ""){
            for(var i=0; i < $scope.obras.length;i++){                
                if($scope.obras[i] && $scope.obras[i]._id == id){
                    $scope.obraSelected = $scope.obras[i];
                    $scope.necesidadCarga.localidad = $scope.obraSelected.localidad;
                    $scope.necesidadCarga.direccion = $scope.obraSelected.direccion;
                    $scope.necesidadCarga.cliente = $scope.obraSelected.cliente.nombre;             
                }
            }
        }
        else{
            $scope.necesidadCarga.obra = null
            $scope.obraSelected = null;
            $scope.necesidadCarga.direccion = null;
            $scope.necesidadCarga.cliente = null;
            $scope.necesidadCarga.localidad = null;
        }
    }

    $scope.getNameObra = function(id){
        for(var i =0; i< $scope.obras.length; i++){
            if($scope.obras[i]._id == id){
                var name = $scope.obras[i].imputacion; 
            }
        }
        if(name){
            return name;
        }
        else{
            return "Sin especificar";
        }
    }

    $scope.getNameUser = function(id){
        for(var i =0; i< $scope.usuarios.length; i++){
            if($scope.usuarios[i]._id == id){
                var name = $scope.usuarios[i].nombre + " " +  $scope.usuarios[i].apellido; 
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

    //Detalles de la necesidad

    $scope.getNameFormato = function(id){
        for(var i=0; i < $scope.formatosCarga.length;i++){
            if($scope.formatosCarga[i]._id == id){
                var name = $scope.formatosCarga[i].nombre;
            }
        }
        if(name){
            return name;
        }
        else{
            return "Sin especificar";
        }
    }

    $scope.getNameTipoCarga = function(id){
        for(var i=0; i < $scope.tiposCarga.length;i++){
            if($scope.tiposCarga[i]._id == id){
                var name = $scope.tiposCarga[i].nombre;
            }
        }
        if(name){
            return name;
        }
        else{
            return "Sin especificar";
        }
    }

    $scope.getNameEstado = function(id){
        for(var i=0; i < $scope.estadosCarga.length;i++){
            if($scope.estadosCarga[i]._id == id){
                var name = $scope.estadosCarga[i].estado;
            }
        }
        if(name){
            return name;
        }
        else{
            return "Sin especificar";
        }
    }

    $scope.showDetalle = function(n){
        necesidadCargaDetalle.getByNecesidad(n._id).success(function(data){
            $scope.nec = n;
            $scope.detalles = data.data;
        })        
    }

    $scope.agregarDetalle = function(){
        $scope.detalle = {};
        $("#myModal").modal();
    }

    $scope.closeModal = function(){
        $scope.detalle = null;
    }

    $scope.returnToNec = function(){
        $scope.nec = null;
        $scope.detalles = null;
        necesidadCarga.getAll().success(function(data){
            $scope.necesidadesCarga = data.data;
            $scope.getPage($scope.necesidadesCarga)
        });
    }

    $scope.saveDetalle = function(){
        if(!$scope.detalle._id){
            for(var i=0; i < $scope.estadosCarga.length;i++){
                if($scope.estadosCarga[i].default){                    
                    $scope.detalle.estadoCarga = $scope.estadosCarga[i]._id;
                }
            }            

            $scope.detalle.fechaAlta = new Date();
            $scope.detalle.necesidad = $scope.nec._id;
            $scope.nec.cantidad++;
            necesidadCargaDetalle.save($scope.detalle).success(function(data1){
                necesidadCarga.update($scope.nec).success(function(data){
                    $scope.detalle = {};
                    $scope.nec = data.data;
                    $scope.detalles.push(data1.data);
                    $scope.toast({
                        type: 'success',
                        title: 'Datos almacenados'
                    })
                })
            })            
        }
        else{
            necesidadCargaDetalle.update($scope.detalle).success(function(data1){
                necesidadCargaDetalle.getByNecesidad($scope.nec._id).success(function(data){  
                    $scope.detalle = {};                  
                    $scope.detalles = data.data;
                    $('#myModal').modal('toggle');    
                    $scope.toast({
                        type: 'success',
                        title: 'Datos almacenados'
                    })
                })                 
            }) 
        }
    }

    $scope.editDetalle = function(d){
        $scope.detalle = angular.copy(d);
        var fecha = new Date(d.fecha);
        if(fecha.getMonth() <=9){
            var mes = "0" + fecha.getMonth();
        }
        else{
            var mes = "" + fecha.getMonth();
        }
        $("#myModal").modal();
        setTimeout(function(){
            //document.getElementById("dateEntrega").value = ""+ fecha.getFullYear() + "-" + mes + "-" + fecha.getDate();
            document.getElementById("dateEntrega").valueAsDate = new Date(d.fecha);
        },500)
    }

    $scope.removeDetalle = function(d){
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
                necesidadCargaDetalle.remove(d._id,$scope.nec._id).success(function(data){
                    if(data.code != 400){
                        $scope.nec = data.data;
                        necesidadCargaDetalle.getByNecesidad($scope.nec._id).success(function(data){
                            $scope.detalles = data.data;
                            $scope.swalWithBootstrapButtons(
                                'Eliminado!',
                                'Se ha eliminado correctamente',
                                'success'
                            )
                        }) 
                    }
                    else{
                        $scope.swalWithBootstrapButtons(
                            'Error!',
                            ''+ data.message,
                            'error'
                        )
                    }
                })
            }
        })
    }

    $scope.changeDisponibilidad = function(nec,disponibilidad){
        necesidadCargaDetalle.getByNecesidad(nec._id).success(function(data){
            if(data.data.length > 0){
                $scope.swalWithBootstrapButtons({
                    title: 'Atención',
                    text: "Está seguro que desea cambiar la disponibilidad?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Si',
                    cancelButtonText: 'No',
                    reverseButtons: true
                }).then((result) => {
                    if (result.value) {
                        nec.disponibilidadCarga = disponibilidad;
                        necesidadCarga.update(nec).success(function(data){
                            necesidadCarga.getAll().success(function(data){
                                $scope.necesidadesCarga = data.data;
                            });
                        })
                    }
                })
            }
            else{
                $scope.swalWithBootstrapButtons(
                    'Advertencia!',
                    'No es posible cambiar la disponibilidad ya que no hay detalles',
                    'info'
                )
            }
        }) 
        
    }
});