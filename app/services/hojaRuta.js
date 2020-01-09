'use strict';

angular.module('sartWeb')
    .factory('hojaRuta', function ($http) {
        return {
            getAll: function () {
                return $http.get(urlServer + '/hojaRuta');
            },
            save: function (h) {
                return $http.post(urlServer + '/hojaRuta', h);
            },
            
            update: function (h) {
                return $http.put(urlServer + '/hojaRuta', h);
            },
            
            remove: function (id) {
                return $http.delete(urlServer + '/hojaRuta/' + id);
            },
            removedetail: function (idHoja,idDetail) {
                return $http.get(urlServer + '/hojaRuta/removeDetail/'+ idHoja + '/' + idDetail);
            },
            updateEstadoTransito: function (h) {
                return $http.put(urlServer + '/updateEstadoTransito', h);
            }
        };
    
    });
