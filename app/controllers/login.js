'use strict';

var app = angular.module('sartWeb');

app.controller('LoginController',
    function ($scope, $rootScope, $window, $location, UserAuthenticationFactory, AuthenticationFactory, $cookies) {

        $scope.loginError = false;
        $scope.remember = false;
        $scope.user = {
            username: '',
            password: ''
        };

        $scope.login = function () {
            $scope.loginError = false;
            var username = $scope.user.username;
            var password = $scope.user.password;

            if (username !== undefined && password !== undefined) {
                UserAuthenticationFactory.login(username, password).success(function (data) {
                    AuthenticationFactory.isLogged = true;

                    if ($scope.remember) {
                        var expiration = new Date();
                        expiration.setDate(expiration.getDate() + 5000);

                        $cookies.put('token', data.token, { 'expires': expiration });
                    } else {
                        $window.sessionStorage.token = data.token;
                    }
                    var expirationUser = new Date();
                    expirationUser.setDate(expirationUser.getDate() + 5);
                    $cookies.put('user', data.data._id, {'expires':expirationUser})

                    $location.path("/");
                }).error(function (status) {
                    $scope.loginError = true;
                });
            } else {
                $scope.loginError = false;
            }
        };
    });