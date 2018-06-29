var myApp = angular.module('myApp');

myApp.controller('LoginController', ['$scope', '$http', 'userService', '$location', '$routeParams', function($scope, $http, userService, $location, $routeParams){
	console.log('LoginController loaded...');

	$scope.login = function(user){
		userService.doLogin(user).then(function(){
        })
	}
	$scope.reset = function(){
		$scope.user.username = '';
		$scope.user.password = '';
	}
}]);