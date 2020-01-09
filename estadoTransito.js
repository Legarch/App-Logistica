'use strict';

angular.module('sartWeb')
    .factory('estTransito', function ($http) {
        return {     
            getAll: function () {
                return $http.get(urlServer + '/estadoTransito');
            },
            save: function (user) {
                return $http.post(urlServer + '/estadoTransito', user);
            },
            
            update: function (user) {
                return $http.put(urlServer + '/estadoTransito', user);
            },
            
            remove: function (id) {
                return $http.delete(urlServer + '/estadoTransito/' + id);
            }
        };
    
    });

