'use strict';

var app = angular.module('sartWeb');

app.controller('HeaderCtrl', function ($scope, $rootScope, $location, UserAuthenticationFactory) {
    
    $scope.logout = function(){
        UserAuthenticationFactory.logout();
    }

    $scope.editUser = function(){
        $location.path("/user");
    }

});
