var myApp = angular.module('myApp');

myApp.controller('HomeController', ['$scope', '$http', 'playlistService', 'songService', 'userService', 'playerService', '$cookies', '$location', '$routeParams', function($scope, $http, playlistService, songService, userService, playerService, $cookies, $location, $routeParams){
	console.log('HomeController loaded...');

	$scope.init = function(){
		if($cookies.get('token')){
			songService.doUserGetListNewSong($scope.data);
			songService.doUserGetListMostFavoriteSong($scope.data);
			songService.doUserGetListFollowingSong($scope.data);
			songService.doUserGetListFavoriteSong($scope.data);
			userService.doUserGetMostFollowing($scope.data);
		} else{
			songService.doGetListNewSong($scope.data);
			songService.doGetListMostFavoriteSong($scope.data);
			userService.doGetMostFollowing($scope.data);
		}
		songService.doGetListMostViewSong($scope.data);
	}
	$scope.getListNewSong = function(){
		if($cookies.get('token')){
			songService.doUserGetListNewSong($scope.data);
		} else{
			songService.doGetListNewSong($scope.data);
		}
	}
	$scope.getListFollowingSong = function(){
		if($cookies.get('token')){
			songService.doUserGetListFollowingSong($scope.data);
		}
	}
	$scope.getListFavoriteSong = function(){
		if($cookies.get('token')){
			songService.doUserGetListFavoriteSong($scope.data);
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