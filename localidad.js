'use strict';

angular.module('sartWeb')
    .factory('localidad', function ($http) {
        return {     
            getAll: function () {
                return $http.get(urlServer + '/localidad');
            },
            save: function (user) {
                return $http.post(urlServer + '/localidad', user);
            },
            
            update: function (user) {
                return $http.put(urlServer + '/localidad', user);
            },
            
            remove: function (id) {
                return $http.delete(urlServer + '/localidad/' + id);
            }
        };
    
    });

