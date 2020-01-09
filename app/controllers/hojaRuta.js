'use strict';

var app = angular.module('sartWeb');

app.controller('HojaRutaCtrl', function ($scope, $rootScope,hojaRuta,transporte, necesidadCarga, formatoCarga, estTransito, localidad, estadoCarga, Pagination, necesidadCargaDetalle, tipoCarga, reporte) {

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

    tipoCarga.getAll().success(function(data){
        $scope.tiposCarga = data.data;
    })

    estadoCarga.getAll().success(function(data){
        $scope.estadosCarga = data.data;
    })

    localidad.getAll().success(function(data){
        $scope.localidades = data.data;
    })

    estTransito.getAll().success(function(data){
        $scope.estadosTransito = data.data;
    })

    formatoCarga.getAll().success(function(data){
        $scope.formatos = data.data;
    })

    transporte.getAll().success(function(data){
        $scope.transportes = data.data;
    })

    hojaRuta.getAll().success(function(data){
        $scope.hojasDeRuta = data.data;
        $scope.getPage($scope.hojasDeRuta)
    });

    $scope.new = function(){
        $scope.hojaDeRuta = {
            detalle: [],            
            pesoTotal: 0,
            volumenTotal: 0
        };
    }

    $scope.filterChange = function(){
        hojaRuta.getAll().success(function(data){
            $scope.hojasDeRuta = data.data;
            $scope.getPage($scope.hojasDeRuta)
        });
    }

    $scope.filterSelect =  function(filter){
        $scope.hojasDeRuta = [];
        var filtre = Number($scope.filtro)
        switch(filtre){
            case 1:
                hojaRuta.getAll().success(function(data){
                    if(filter){
                        for(var i=0; i < data.data.length;i++){               
                            if(data.data[i].estadoCarga._id == filter._id){
                                $scope.hojasDeRuta.push(data.data[i])
                            }
                        }
                    }
                    else{
                        $scope.hojasDeRuta = data.data;
                    }
                    $scope.getPage($scope.hojasDeRuta)
                });
                break;
            case 2:
                hojaRuta.getAll().success(function(data){
                    if(filter){
                        for(var i=0; i < data.data.length;i++){               
                            if(data.data[i].transporte._id == filter._id){
                                $scope.hojasDeRuta.push(data.data[i])
                            }
                        }
                    }
                    else{
                        $scope.hojasDeRuta = data.data;
                    }
                    $scope.getPage($scope.hojasDeRuta)
                });
                break;
            case 3:
                hojaRuta.getAll().success(function(data){
                    if(filter == 1){                        
                        for(var i=0; i < data.data.length;i++){               
                            if(data.data[i].isOpen){
                                $scope.hojasDeRuta.push(data.data[i])
                            }
                        }
                    }
                    else if(filter == 2){
                        for(var i=0; i < data.data.length;i++){               
                            if(!data.data[i].isOpen){
                                $scope.hojasDeRuta.push(data.data[i])
                            }
                        }
                    }      
                    else{
                        $scope.hojasDeRuta = data.data;
                    }              
                    $scope.getPage($scope.hojasDeRuta)
                });
                break;
        }
    }

    $scope.save= function(){
        if(!$scope.hojaDeRuta._id){
            //Setea el estado de carga default 
            for(var i=0; i < $scope.estadosCarga.length;i++){
                if($scope.estadosCarga[i].default){                    
                    $scope.hojaDeRuta.estadoCarga = $scope.estadosCarga[i]._id;
                }
            }  
            //Setea demas valores
            $scope.hojaDeRuta.fechaAlta = new Date();
            $scope.hojaDeRuta.cantidadItems = $scope.hojaDeRuta.detalle.length;
            $scope.hojaDeRuta.transporte = $scope.transporte._id;


            hojaRuta.save($scope.hojaDeRuta).success(function(data){
                hojaRuta.getAll().success(function(data1){
                    $scope.hojasDeRuta = data1.data;
                    $scope.getPage($scope.hojasDeRuta)
                    $scope.hojaDeRuta = null;
                    $scope.toast({
                        type: 'success',
                        title: 'Datos almacenados'
                    })
                });
            });
        }
        else{
            hojaRuta.update($scope.hojaDeRuta).success(function(data){
                hojaRuta.getAll().success(function(data1){
                    $scope.hojasDeRuta = data1.data;
                    $scope.getPage($scope.hojasDeRuta)
                    $scope.hojaDeRuta = null;
                    $scope.toast({
                        type: 'success',
                        title: 'Datos almacenados'
                    })
                });
            })
        }
    }

    $scope.edit = function(h){
        $scope.hojaDeRuta = h;
        $scope.transporte = $scope.hojaDeRuta.transporte;
        $scope.cargaMaxima = $scope.transporte.cargaMaxima;
        $scope.volumenMaximo = $scope.transporte.volumen;
        $scope.pCargaMax = ($scope.hojaDeRuta.pesoTotal / $scope.transporte.cargaMaxima) *100;
        $scope.pVolMax = ($scope.hojaDeRuta.volumenTotal / $scope.transporte.volumen) *100;        
        necesidadCargaDetalle.getVariousDetails(h._id).success(function(data){                
            $scope.detalles = data.data;
            for(var i=0;i<$scope.detalles.length;i++){
                for(var j =0;j < $scope.hojaDeRuta.detalle.length;j++){
                    if($scope.hojaDeRuta.detalle[j].necesidadDetalle._id == $scope.detalles[i]._id){
                        $scope.detalles[i].selected = true;
                    }
                }
            }
        })
    }

    $scope.remove = function(h){
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
                hojaRuta.remove(h._id).success(function(data){
                    hojaRuta.getAll().success(function(data1){
                        $scope.hojasDeRuta = data1.data;
                        $scope.getPage($scope.hojasDeRuta)
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
        hojaRuta.getAll().success(function(data){
            $scope.hojasDeRuta = data.data;
            $scope.getPage($scope.hojasDeRuta);
            $scope.hojaDeRuta = null;
            $scope.transporte = null;
            $scope.detalles = null;
        });
       
    }

    $scope.selectTransporte = function(){
        if($scope.hojaDeRuta.transporte && $scope.hojaDeRuta.transporte != ""){
            for(var i=0;i < $scope.transportes.length;i++){
                if($scope.transportes[i]._id == $scope.hojaDeRuta.transporte){
                    $scope.transporte = $scope.transportes[i];
                    $scope.pVolMax = 0;
                    $scope.pCargaMax = 0;
                    $scope.cargaMaxima = $scope.transporte.cargaMaxima;
                    $scope.volumenMaximo = $scope.transporte.volumen;
                }
            }
            necesidadCargaDetalle.getDetallesDisponibles().success(function(data){                
                $scope.detalles = data.data;
                $scope.hojaDeRuta.detalle = [];
                $scope.hojaDeRuta.pesoTotal = 0;
                $scope.hojaDeRuta.volumenTotal = 0;
            })
        }
        else{
            $scope.transporte = null;
            $scope.detalles =  null;
            $scope.hojaDeRuta = {
                detalle: [],
                pesoTotal: 0,
                volumenTotal: 0
            };
        }
    }

    $scope.changeTransporte = function(){
        for(var i=0;i< $scope.transportes.length;i++){
            if($scope.hojaDeRuta.transporte == $scope.transportes[i]._id){
                $scope.transporte = $scope.transportes[i];
            }
        }        
        $scope.cargaMaxima = $scope.transporte.cargaMaxima;
        $scope.volumenMaximo = $scope.transporte.volumen;
        $scope.pCargaMax = ($scope.hojaDeRuta.pesoTotal / $scope.transporte.cargaMaxima) *100;
        $scope.pVolMax = ($scope.hojaDeRuta.volumenTotal / $scope.transporte.volumen) *100;   
    }

    $scope.getTipoCarga = function(id){
        for(var i=0; i < $scope.tiposCarga.length;i++){
            if($scope.tiposCarga[i]._id == id){
                return $scope.tiposCarga[i];
            }
        }
    }

    $scope.getFormato = function(id){
        for(var i=0; i < $scope.formatos.length;i++){
            if($scope.formatos[i]._id == id){
                return $scope.formatos[i];
            }
        }
    }

    $scope.getLocalidad = function(id){
        for(var i=0; i < $scope.localidades.length;i++){
            if($scope.localidades[i]._id == id){
                return $scope.localidades[i].nombre;
            }
        }
    }

    $scope.getTransporte = function(id){
        for(var i=0; i < $scope.transportes.length;i++){
            if($scope.transportes[i]._id == id){
                return $scope.transportes[i].marca + " " + $scope.transportes[i].modelo;
            }
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

    $scope.selectDetalle = function(d){
        if(!d.selected){
            if($scope.checkCarga(d)){
                $scope.addDetalle(d);
            }
            else{
                $scope.swalWithBootstrapButtons({
                    title: 'Atención',
                    text: "Esta por superar la carga o volumen máximo permitido para el transporte. ¿Agregar la carga de todas formas?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Si',
                    cancelButtonText: 'No',
                    reverseButtons: true
                }).then((result) => {
                    if (result.value) {
                        $scope.addDetalle(d);
                        $scope.$apply();
                    }
                })
            }
            
        }
        else{
            var indice=0;
            for(var i=0;i < $scope.hojaDeRuta.detalle.length;i++){
                if($scope.hojaDeRuta.detalle[i].necesidadDetalle._id == d._id){
                    indice = i;                               
                    $scope.hojaDeRuta.pesoTotal -= $scope.hojaDeRuta.detalle[i].necesidadDetalle.formatoCarga.peso;    
                    $scope.hojaDeRuta.volumenTotal -= $scope.hojaDeRuta.detalle[i].necesidadDetalle.formatoCarga.volumen;                           
                }
            }

            $scope.hojaDeRuta.detalle.splice(indice,1);
            d.selected = false;
            $scope.changePorcentaje();
        } 
    }

    $scope.addDetalle = function(d){
        var estadoDefault= {};
        for(var i=0; i < $scope.estadosTransito.length;i++){
            if($scope.estadosTransito[i].default){
                estadoDefault = $scope.estadosTransito[i];
            }
        }
        var detalleHoja={
            necesidadDetalle: d,
            estadoTransito: estadoDefault._id
        }
        $scope.hojaDeRuta.pesoTotal += d.formatoCarga.peso;
        $scope.hojaDeRuta.volumenTotal += d.formatoCarga.volumen;

        $scope.hojaDeRuta.detalle.push(detalleHoja);
        d.selected = true;
        $scope.changePorcentaje();
    }

    $scope.checkCarga = function(d){
        $scope.formatoSelect = d.formatoCarga;

        if(($scope.formatoSelect.peso + $scope.hojaDeRuta.pesoTotal) <= $scope.transporte.cargaMaxima 
            && ($scope.formatoSelect.volumen + $scope.hojaDeRuta.volumenTotal <= $scope.volumenMaximo)){
            return true;
        }        
    }

    $scope.changePorcentaje = function(){
        $scope.pCargaMax = ($scope.hojaDeRuta.pesoTotal / $scope.transporte.cargaMaxima) *100;
        $scope.pVolMax = ($scope.hojaDeRuta.volumenTotal / $scope.transporte.volumen) *100;
    }

    $scope.showDetails = function(h){
        if(h.detalle.length > 0){
            $scope.hojaRuta = h;
            $("#myModalDetails").modal();
        }        
    }

    $scope.removeDetail = function(idHoja,idDet){
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
                hojaRuta.removedetail(idHoja,idDet).success(function(data1){
                    hojaRuta.getAll().success(function(data){
                        $scope.hojasDeRuta = data.data;
                        $scope.getPage($scope.hojasDeRuta)
                        $scope.swalWithBootstrapButtons(
                            'Eliminado!',
                            'Se ha eliminado correctamente',
                            'success'
                        )
                        $scope.hojaRuta = data1.data;
                    });
                    
                }) 
            }
        })
         
    }

    $scope.changeEstado = function(indice){
        $scope.indice = indice;
        $("#modalEstadoTransito").modal();
    }

    $scope.changeEstadoHoja = function(h){
        $scope.hojaRuta = h;
        $("#modalEstadoHoja").modal();
    }

    $scope.updateEstadoHoja = function(){
        var estado = JSON.parse($scope.estadoHoja); 
        $scope.hojaRuta.estadoCarga = estado;
        hojaRuta.update($scope.hojaRuta).success(function(data){            
            $('#modalEstadoHoja').modal('toggle');
        })
    }

    $scope.closeHoja = function(h){
        if(h.isOpen){
            h.isOpen = false;
            hojaRuta.update(h).success(function(data){            
                
            })
        }
        else{
            h.isOpen = true;
            hojaRuta.update(h).success(function(data){            
                
            })
        }
    }

    $scope.updateEstado = function(){
        if($scope.indice != null){                      
            var estado = JSON.parse($scope.estadoTransito);        
            $scope.hojaRuta.detalle[$scope.indice].estadoTransito = estado; 
            hojaRuta.updateEstadoTransito($scope.hojaRuta).success(function(data){
                $scope.indice = null;
                $('#modalEstadoTransito').modal('toggle');
            })
        }
        else{
            var estado = JSON.parse($scope.estadoTransito);
            for(var i=0; i < $scope.hojaRuta.detalle.length; i++){
                $scope.hojaRuta.detalle[i].estadoTransito = estado;
            }
            hojaRuta.updateEstadoTransito($scope.hojaRuta).success(function(data){
                $scope.indice = null;
                $('#modalEstadoTransito').modal('toggle');
            })
        }
    }

    $scope.closeModal = function(){
        $scope.indice = null;
        $('#modalEstadoTransito').modal('toggle');        
    }

    $scope.closeModalHoja = function(){
        $scope.hojaRuta = null;
        $('#modalEstadoHoja').modal('toggle');
    }

    $scope.exportarByExcel = function(hoja){
        var hojaFinal = [{
            transporte: hoja.transporte.marca + " " + hoja.transporte.modelo,
            pesoTotal: hoja.pesoTotal,
            volumenTotal: hoja.volumenTotal,
            estado: hoja.estadoCarga.estado,
            fecha: new Date(hoja.fechaAlta).getDate() + "/" + (new Date(hoja.fechaAlta).getMonth() + 1)+ "/" + new Date(hoja.fechaAlta).getFullYear()
        }]
        alasql('SELECT transporte AS Transporte, pesoTotal AS PesoTotal, volumenTotal AS VolumenTotal, estado as Estado, fecha as FechaCreacion INTO XLSX("hoja.xlsx",{headers:true}) FROM ?', [hojaFinal]);
    }

    $scope.exportDetalle = function(d){
        var detalles = [];
        for(var i=0; i< d.length;i++){
            var det = {
                cantidad: d[i].necesidadDetalle.cantidad,
                carga: d[i].necesidadDetalle.formatoCarga.nombre,
                tipo:d[i].necesidadDetalle.tipoCarga.nombre,
                peso: d[i].necesidadDetalle.formatoCarga.peso,
                volumen: d[i].necesidadDetalle.formatoCarga.volumen,
                origen: d[i].necesidadDetalle.origen,
                destino: d[i].necesidadDetalle.necesidad.localidad.nombre,
                estadoTransito: d[i].estadoTransito.estado,
                fecha: new Date(d[i].necesidadDetalle.fecha).getDate() + "/" + (new Date(d[i].necesidadDetalle.fecha).getMonth() +1) + "/" + new Date(d[i].necesidadDetalle.fecha).getFullYear()
            }
            detalles.push(det);
        }        
        alasql('SELECT cantidad AS Cantidad, carga AS Carga, tipo AS Tipo, peso as Peso, volumen as Volumen, origen as Origen, destino as Destino, estadoTransito as EstadoTransito, fecha as FechaEntrega INTO XLSX("detalle-hoja.xlsx",{headers:true}) FROM ?', [detalles]);
    }

    $scope.report = function(hoja){                
        if(hoja.detalle.length > 0){
            $("#modalReporte").modal();
            document.getElementById("modalReporte").style.pointerEvents = "none";
            reporte.hojaRuta(hoja._id).success(function(rep){
                hojaRuta.getAll().success(function(data){                    
                    $scope.hojasDeRuta = data.data;
                    $scope.getPage($scope.hojasDeRuta);
                    $('#modalReporte').modal('toggle'); 
                    document.getElementById("modalReporte").style.pointerEvents = "all";
                    window.open("../downloads/reports/" + rep.name, "_blank");
                });
            })
        }        
    }
});