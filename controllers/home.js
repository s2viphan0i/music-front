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
	$scope.playSong = function(song){
		playerService.Play({
			id: song.id,
			StreamUri:"http://localhost/resource/audio/"+song.url,
			title: song.title,
			artist: song.user.fullname,
			add: false
		});
	}
	$scope.addSongToPlaying = function(song){
		playerService.Play({
			id: song.id,
			StreamUri:"http://localhost/resource/audio/"+song.url,
			title: song.title,
			artist: song.user.fullname,
			add: true
		});
	}
	$scope.addFavorite = function(songId){
		songService.doUserFavoriteSong(songId);
	}
	$scope.removeFavorite = function(songId){
		songService.doUserFavoriteSong(songId);
	}
}]);