'use strict';

angular.module('sartWeb')
    .factory('perfil', function ($http) {
        return {     
            getAll: function () {
                return $http.get(urlServer + '/perfil');
            },
            save: function (user) {
                return $http.post(urlServer + '/perfil', user);
            },
            
            update: function (user) {
                return $http.put(urlServer + '/perfil', user);
            },
            
            remove: function (id) {
                return $http.delete(urlServer + '/perfil/' + id);
            }
        };
    
    });

