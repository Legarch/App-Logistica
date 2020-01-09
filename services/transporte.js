'use strict';

angular.module('sartWeb')
    .factory('transporte', function ($http) {
        return {     
            getAll: function () {
                return $http.get(urlServer + '/transporte');
            },
            save: function (user) {
                return $http.post(urlServer + '/transporte', user);
            },
            update: function (user) {
                return $http.put(urlServer + '/transporte', user);
            },
            remove: function (id) {
                return $http.delete(urlServer + '/transporte/' + id);
            }
        };
    
    });

