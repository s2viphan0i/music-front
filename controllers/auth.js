var myApp = angular.module('myApp');

myApp.controller('AuthController', ['$scope', '$http', 'userService', '$location', '$routeParams', function($scope, $http, userService, $location, $routeParams){
	console.log('AuthController loaded...');

	$scope.login = function(data){
		userService.doLogin(data).then(function(){
        })
	}
	$scope.reset = function(){
		$scope.user.username = '';
		$scope.user.password = '';
	}
	$scope.register = function(data){
		userService.doRegister(data).then(function(){
        })
	}
}]);