var myApp = angular.module('myApp');

myApp.controller('HomeController', ['$scope', '$http', '$cookies', '$location', '$routeParams', function($scope, $http, $cookies, $location, $routeParams){
	console.log('HomeController loaded...');

	$scope.init = function(){
		console.log($cookies.get('username'))
		$scope.username = $cookies.get('username');
		$scope.fullname = $cookies.get('fullname');
		$scope.avatar = $cookies.get('avatar');
	}
}]);