'use strict';

angular.module('sartWeb')
    .factory('formatoCarga', function ($http) {
        return {     
            getAll: function () {
                return $http.get(urlServer + '/formatoCarga');
            },
            save: function (user) {
                return $http.post(urlServer + '/formatoCarga', user);
            },
            
            update: function (user) {
                return $http.put(urlServer + '/formatoCarga', user);
            },
            
            remove: function (id) {
                return $http.delete(urlServer + '/formatoCarga/' + id);
            }
        };
    
    });

