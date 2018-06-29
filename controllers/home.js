var myApp = angular.module('myApp');

myApp.controller('HomeController', ['$scope', '$http', '$cookies', '$location', '$routeParams', function($scope, $http, $cookies, $location, $routeParams){
	console.log('HomeController loaded...');

	$scope.ck = function(){
		$scope.username = $cookies.get('username');
		$scope.email = $cookies.get('email');
	}
}]);