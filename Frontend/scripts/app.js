'use strict';

angular.module('pmcApp',['ngRoute'])
    .config(['$routeProvider','$httpProvider', function ($routeProvider, $httpProvider){
        $routeProvider
            
            .when('/', {
            templateUrl: 'index.html',
            controller: 'ControladorCtrl',
            controllerAs: 'controlador'
        })
            
            .otherwise({
            redirectTo:'/'
        });
        
    }]);