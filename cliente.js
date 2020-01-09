'use strict';

angular.module('sartWeb')
    .factory('cliente', function ($http) {
        return {     
            getAll: function () {
                return $http.get(urlServer + '/cliente');
            },
            save: function (user) {
                return $http.post(urlServer + '/cliente', user);
            },
            
            update: function (user) {
                return $http.put(urlServer + '/cliente', user);
            },
            
            remove: function (id) {
                return $http.delete(urlServer + '/cliente/' + id);
            }
        };
    
    });

