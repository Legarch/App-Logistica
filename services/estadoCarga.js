'use strict';

angular.module('sartWeb')
    .factory('estadoCarga', function ($http) {
        return {     
            getAll: function () {
                return $http.get(urlServer + '/estadoCarga');
            },
            save: function (user) {
                return $http.post(urlServer + '/estadoCarga', user);
            },
            
            update: function (user) {
                return $http.put(urlServer + '/estadoCarga', user);
            },
            
            remove: function (id) {
                return $http.delete(urlServer + '/estadoCarga/' + id);
            }
        };
    
    });

