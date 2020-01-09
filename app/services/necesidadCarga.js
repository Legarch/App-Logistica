'use strict';

angular.module('sartWeb')
    .factory('necesidadCarga', function ($http) {
        return {     
            getAll: function () {
                return $http.get(urlServer + '/necesidadCarga');
            },
            save: function (n) {
                return $http.post(urlServer + '/necesidadCarga', n);
            },
            
            update: function (n) {
                return $http.put(urlServer + '/necesidadCarga', n);
            },
            
            remove: function (id) {
                return $http.delete(urlServer + '/necesidadCarga/' + id);
            },

            removeDetalle: function(n, id){
                return $http.put(urlServer + '/necesidadCarga/deleteDetalle/'+ id, n);
            },

            getDetallesDisponibles: function(){
                return $http.get(urlServer + '/necesidadCarga/getDetallewithoutUsing');
            }
        };
    
    });

