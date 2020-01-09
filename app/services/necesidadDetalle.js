'use strict';

angular.module('sartWeb')
    .factory('necesidadCargaDetalle', function ($http) {
        return {     
            getAll: function () {
                return $http.get(urlServer + '/necesidadCargaDetalle');
            },

            get: function (id) {
                return $http.get(urlServer + '/necesidadCargaDetalle/get/'+ id);
            },

            getByNecesidad: function (id) {
                return $http.get(urlServer + '/necesidadCargaDetalle/getByNecesidad/'+ id);
            },

            save: function (n) {
                return $http.post(urlServer + '/necesidadCargaDetalle', n);
            },
            
            update: function (n) {
                return $http.put(urlServer + '/necesidadCargaDetalle', n);
            },
            
            remove: function (id,idNec) {
                return $http.delete(urlServer + '/necesidadCargaDetalle/' + id + '/' + idNec);
            },

            getDetallesDisponibles: function(){
                return $http.get(urlServer + '/necesidadCargaDetalle/getDetallewithoutUsing');
            },
            getVariousDetails: function(id){
                return $http.get(urlServer + '/necesidadCargaDetalle/getVariousDetails/' + id);
            }            
        };
    
    });

