var myApp = angular.module('myApp');

myApp.controller('HomeController', ['$scope', '$http', 'playlistService', 'songService', 'userService', 'playerService', '$cookies', '$location', '$routeParams', function($scope, $http, playlistService, songService, userService, playerService, $cookies, $location, $routeParams){
	console.log('HomeController loaded...');

	$scope.init = function(){
		$scope.data.selected = {};
		$scope.showCreatePlaylistModal=false;
		$scope.showPlaylistModal=false;
		if($cookies.get('auth')){
			songService.doUserGetListNewSong($scope.data);
			songService.doUserGetListMostFavoriteSong($scope.data);
		} else{
			songService.doGetListNewSong($scope.data);
			songService.doGetListMostFavoriteSong($scope.data);
		}
		songService.doGetListMostViewSong($scope.data);
		
	}
	$scope.showCreatePlaylist = function(){
		$scope.data.msg=null;
		$scope.data.success=null;
		$scope.showCreatePlaylistModal=true;
	}
	$scope.hideCreatePlaylist = function(){
		$scope.showCreatePlaylistModal=false;
	}
	$scope.showAddPlaylist = function(song){
		if(song){
			$scope.data.selected.song = song
		}
		$scope.showPlaylistModal=true;
	}
	$scope.hideAddPlaylist = function(){
		$scope.showPlaylistModal=false;
	}
	$scope.createPlaylist = function(){
		if($cookies.get("auth")){
			playlistService.doCreatePlaylist($scope.data).then(function(){
				$scope.data.userPlaylists.push($scope.data.created);
				$scope.data.playlist.title = "";
				$scope.data.playlist.image = "";
			});
		}
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
			playlist: false
		});
	}
	$scope.addSongToPlaying = function(song){
		playerService.Play({
			id: song.id,
			StreamUri:"http://localhost/resource/audio/"+song.url,
			title: song.title,
			artist: song.user.fullname,
			playlist: true
		});
	}
	$scope.addFavorite = function(songId){
		songService.doUserFavoriteSong(songId);
	}
	$scope.removeFavorite = function(songId){
		songService.doUserFavoriteSong(songId);
	}
	$scope.addSongToPlaylist = function(song, playlist){
		playlistService.doAddSongToPlaylist(song, playlist, $scope.data).then(function(){
			if(!playlist.songs){
				playlist.songs = [];
			}
			if($scope.data.success){
				playlist.songs.push(song);
			}
		});
	}
	$scope.checkSonginPlaylist = function(song, playlist){
		if(song){
			return _.findLastIndex(playlist.songs, {id:song.id})==-1;
		}
	}
}]);