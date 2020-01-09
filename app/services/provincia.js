'use strict';

angular.module('sartWeb')
    .factory('provincia', function ($http) {
        return {     
            getAll: function () {
                return $http.get(urlServer + '/provincia');
            },
            save: function (user) {
                return $http.post(urlServer + '/provincia', user);
            },
            
            update: function (user) {
                return $http.put(urlServer + '/provincia', user);
            },
            
            remove: function (id) {
                return $http.delete(urlServer + '/provincia/' + id);
            }
        };
    
    });

