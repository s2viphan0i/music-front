var myApp = angular.module('myApp');

myApp.controller('UploadController', ['$scope', '$http', '$cookies', 'userService', 'songService', '$location', '$routeParams', function($scope, $http, $cookies, userService, songService, $location, $routeParams){
    console.log('UploadController loaded...');
    $scope.data = [];
	$scope.initAddSong = function(){
		$scope.status = true;
		userService.doGetUserByAuth($scope.data);
	}
    $scope.addSong = function(){
		songService.doAddSong($scope.data);
	}
}]);