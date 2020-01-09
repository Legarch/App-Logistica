'use strict';

angular.module('sartWeb')
    .factory('tipoCarga', function ($http) {
        return {     
            getAll: function () {
                return $http.get(urlServer + '/tipoCarga');
            },
            save: function (user) {
                return $http.post(urlServer + '/tipoCarga', user);
            },
            update: function (user) {
                return $http.put(urlServer + '/tipoCarga', user);
            },
            remove: function (id) {
                return $http.delete(urlServer + '/tipoCarga/' + id);
            }
        };
    
    });

