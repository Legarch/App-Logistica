'use strict';

angular.module('sartWeb').factory('UserAuthenticationFactory', function ($window, $http, AuthenticationFactory, $cookies) {

    return {
        login: function(username, password) {
            return $http.post(urlServer +'/auth', {
                user: username,
                pass: password
            });
        },

        logout: function() {
            if(AuthenticationFactory.isLogged) {
                delete $window.sessionStorage.token;
                $cookies.remove('token');
                $cookies.remove('user');
                $window.location.href = '/';
            }
        }
    };

});