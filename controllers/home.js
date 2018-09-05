var myApp = angular.module('myApp');

myApp.controller('HomeController', ['$scope', '$http', 'playlistService', 'songService', 'userService', 'playerService', '$cookies', '$location', '$routeParams', function($scope, $http, playlistService, songService, userService, playerService, $cookies, $location, $routeParams){
	console.log('HomeController loaded...');

	$scope.init = function(){
		if($cookies.get('auth')){
			songService.doUserGetListNewSong($scope.data);
			songService.doUserGetListMostFavoriteSong($scope.data);
		} else{
			songService.doGetListNewSong($scope.data);
			songService.doGetListMostFavoriteSong($scope.data);
		}
		songService.doGetListMostViewSong($scope.data);
	}
	$scope.getListNewSong = function(){
		if($cookies.get('auth')){
			songService.doUserGetListNewSong($scope.data);
		} else{
			songService.doGetListNewSong($scope.data);
		}
	}
	$scope.getListMostFavoriteSong = function(){
		if($cookies.get('auth')){
			songService.doUserGetListMostFavoriteSong($scope.data);
		} else{
			songService.doGetListMostFavoriteSong($scope.data);
		}
	}
	
}]);