'use strict';

angular.module('sartWeb')
    .factory('obra', function ($http) {
        return {     
            getAll: function () {
                return $http.get(urlServer + '/obra');
            },
            save: function (user) {
                return $http.post(urlServer + '/obra', user);
            },
            
            update: function (user) {
                return $http.put(urlServer + '/obra', user);
            },
            
            remove: function (id) {
                return $http.delete(urlServer + '/obra/' + id);
            }
        };
    
    });

