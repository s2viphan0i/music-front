var myApp = angular.module('myApp');

myApp.controller('IndexController', ['$scope', '$http', 'songService', 'playerService', 'playlistService', 'userService', '$cookies', '$location', '$routeParams', function($scope, $http, songService, playerService, playlistService, userService, $cookies, $location, $routeParams){
	console.log('IndexController loaded...');
	$scope.showCreatePlaylistModal=false;
	$scope.showPlaylistModal=false;
	$scope.checkNavPage = function(){
		return _.contains(["/login", "/logout", "/register", "/forgot", "/404"], $location.path());
    }
    
    $scope.checkHomePage = function(){
		return _.contains(["/home", "/test"], $location.path());
	}

	$scope.checkBlackPage = function(){
		return $location.path().match(/song/)||$location.path().match(/playlist/)?true:false;
	}

	$scope.search = function(key){
		$location.path('/search').search({keyword: key, type: $routeParams.type, sort: "2"});
	}

	$scope.$watch(function() { return $cookies.get('token'); }, function(newValue) {
        $scope.data = {
			cookie : {
				username : $cookies.get('username'),
				fullname : $cookies.get('fullname'),
				avatar : $cookies.get('avatar'),
				role : $cookies.get('role'),
			}
		};
		if($cookies.get('token')){
			userService.doUserGetFollowing($scope);
			playlistService.doGetAllUserPlaylist($scope);
			songService.doGetAllGenres($scope);
		}
    });
	$scope.login = function(){
		userService.doLogin($scope.data).then(function(){
			if($scope.data.success){
				$scope.showLogin = false;
			}
        })
	}
	$scope.logout = function(){
		$scope.cookie = null;
		userService.doLogout();
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
		if($cookies.get('token')){
			if(song){
				$scope.data.selected = {
					song : song
				}
			}
			$scope.showPlaylistModal=true;
		} else {
			$location.path('/login');
		}
	}
	$scope.hideAddPlaylist = function(){
		$scope.showPlaylistModal=false;
	}
	$scope.createPlaylist = function(){
		if($cookies.get("token")){
			playlistService.doCreatePlaylist($scope.data).then(function(){
				if(!$scope.userPlaylists){
					$scope.userPlaylists = [];
				}
				$scope.userPlaylists.push($scope.data.created);
				$scope.data.playlist.title = "";
				$scope.data.playlist.image = "";
			});
		}
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
	$scope.removeSongFromPlaylist = function(song, playlist){
		playlistService.doRemoveSongFromPlaylist(song, playlist, $scope.data).then(function(){
			if($scope.data.success){
				playlist.songs.splice(_.findLastIndex(playlist.songs, {id:song.id}), 1);
			}
		});
	}
	$scope.checkSonginPlaylist = function(song, playlist){
		if(song){
			return _.findLastIndex(playlist.songs, {id:song.id})==-1;
		}
	}
	$scope.showPlaylist = function(title){
		if($scope.data.playlist&&$scope.data.playlist.keyword){
			return title.toUpperCase().includes($scope.data.playlist.keyword.toUpperCase());
		} else{
			return true;
		}
	}
	$scope.searchSong = function(){
		console.log($scope.data.search.key);
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
	$scope.addFavorite = function(song){
		if($cookies.get('token')){
			songService.doUserFavoriteSong(song.id).then(function(){
				song.favorited=true;
				song.favorites=song.favorites+1;
			});
		} else {
			$location.path('/login');
		}
	}
	$scope.removeFavorite = function(song){
		if($cookies.get('token')){
			songService.doUserFavoriteSong(song.id).then(function(){
				song.favorited=false;
				song.favorites=song.favorites-1;
			});
		} else {
			$location.path('/login');
		}
	}
	$scope.addFollow = function(id){
		userService.doFollow(id);
	}
	$scope.removeFollow = function(id){
		userService.doFollow(id);
	}
	$scope.isLogin = function(){
		return $cookies.get('token');
	}
}]);