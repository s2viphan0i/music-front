var myApp = angular.module('myApp');

myApp.controller('HomeController', ['$scope', '$http', 'songService', 'userService', 'playerService', '$cookies', '$location', '$routeParams', function($scope, $http, songService, userService, playerService, $cookies, $location, $routeParams){
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
	$scope.playSong = function(song){
		playerService.Play({
			id: song.id,
			StreamUri:"http://localhost/resource/audio/"+song.url,
			title: song.title,
			artist: song.user.fullname,
			playlist: false
		});
	}
	$scope.addSongToPlaylist = function(song){
		playerService.Play({
			id: song.id,
			StreamUri:"http://localhost/resource/audio/"+song.url,
			title: song.title,
			artist: song.user.fullname,
			playlist: true
		});
	}
	$scope.addFavorite = function(songId){
		userService.doFavorite(songId);
	}
	$scope.removeFavorite = function(songId){
		userService.doFavorite(songId);
	}
}]);