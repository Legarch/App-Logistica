'use strict';

angular.module('sartWeb')
    .factory('usuario', function ($http) {
        return {
            isLogged: function () {
                return $http.get(urlServer + '/islogged');
            },
            getAll: function () {
                return $http.get(urlServer + '/usuario');
            },
            get: function (id) {
                return $http.get(urlServer + '/usuario/get/' + id);
            },
            save: function (user) {
                return $http.post(urlServer + '/usuario', user);
            },
            
            update: function (user) {
                return $http.put(urlServer + '/usuario', user);
            },
            
            remove: function (id) {
                return $http.delete(urlServer + '/usuario/' + id);
            }
        };
    
    });

