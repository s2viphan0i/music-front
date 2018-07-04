var myApp = angular.module('myApp');

myApp.controller('UserController', ['$scope', '$http', 'userService', '$location', '$routeParams', function($scope, $http, userService, $location, $routeParams){
	console.log('UserController loaded...');

}]);