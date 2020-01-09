'use strict';

angular.module('sartWeb')
    .factory('reporte', function ($http) {
        return {     
            hojaRuta: function (id) {
                return $http.get(urlServer + '/reporte/hojaRuta/'+ id);
            }
        };
    
    });

