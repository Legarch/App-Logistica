'use strict';

angular.module('sartWeb').factory('AuthenticationFactory', function ($window,$cookies) {
    var auth = {
        isLogged: false,
        check: function() {
            if($window.sessionStorage.token || $cookies.get('token') || ($cookies.get('user')))
                this.isLogged = true
            else
                this.isLogged = false;
        }
    };

    return auth;
});