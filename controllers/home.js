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
	$scope.playSong = function(id){
		$scope.data.songId = id;
		if($cookies.get('auth')){
			songService.doUserGetSongById($scope.data, function(){
				$scope.data.song.lyric = unescape($scope.data.song.lyric);
				playerService.Play({
					StreamUri:"http://localhost:8080/resource/audio?name="+$scope.data.song.url,
				});
			});
			
		} else{
			songService.doGetSongById($scope.data, function(){
				$scope.data.song.lyric = unescape($scope.data.song.lyric);
				playerService.Play({
					StreamUri:"http://localhost:8080/resource/audio?name="+$scope.data.song.url,
				});
			});
		}
	}
	$scope.addFavorite = function(songId){
		userService.doFavorite(songId);
	}
	$scope.removeFavorite = function(songId){
		userService.doFavorite(songId);
	}
}]);