var myApp = angular.module('myApp');

myApp.controller('HomeController', ['$scope', '$http', 'songService', 'userService', '$cookies', '$location', '$routeParams', function($scope, $http, songService, userService, $cookies, $location, $routeParams){
	console.log('HomeController loaded...');

	$scope.init = function(){
		$scope.data = [];
		$scope.auth = $cookies.get('auth');
		$scope.username = $cookies.get('username');
		$scope.fullname = $cookies.get('fullname');
		$scope.avatar = $cookies.get('avatar');
		if($cookies.get('auth')){
			songService.doUserGetListNewSong($scope.data);
			songService.doUserGetListMostFavoriteSong($scope.data);
		} else{
			songService.doGetListNewSong($scope.data);
			ongService.doGetListMostFavoriteSong($scope.data);
		}
	}
	$scope.addFavorite = function(songId){
		console.log("a");
		userService.doFavorite(songId);
	}
	$scope.removeFavorite = function(songId){
		userService.doFavorite(songId);
	}
}]);