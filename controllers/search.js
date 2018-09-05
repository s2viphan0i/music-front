var myApp = angular.module('myApp');

myApp.controller('SearchController', ['$scope', '$http', '$cookies', 'userService', 'songService', 'playerService', '$location', '$routeParams', function($scope, $http, $cookies, userService, songService, playerService, $location, $routeParams){
	console.log('SearchController loaded...');
	$scope.init = function(){
		
	}
	$scope.search = function(page){
		$scope.data = {
			keyword : "",
			page : page
		}
        if($routeParams.keyword){
			$scope.data.keyword = $routeParams.keyword;
		}
		if($routeParams.type){
			$scope.data.type = $routeParams.type;
		} else{
			$scope.data.type = "song";
		}
		switch($scope.data.type){
			case "song":
				$(".nav-tabs li").removeClass("active");
				$("#song-tab").addClass("active");
				$(".tab-content .tab-pane").removeClass("active");
				$("#song").addClass("active");
				if($cookies.get('auth')){
					songService.doUserGetSongByKeyword($scope.data);
				} else{
					songService.doGetSongByKeyword($scope.data);
				}
				break;
			case "user":
				$(".nav-tabs li").removeClass("active");
				$("#user-tab").addClass("active");
				$(".tab-content .tab-pane").removeClass("active");
				$("#user").addClass("active");
				if($cookies.get('auth')){
					userService.doUserGetUserByKeyword($scope.data);
				} else{
					songService.doGetUserByKeyword($scope.data);
				}
				break;
		}
		console.log($scope.data);
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
		if($cookies.get('auth')){
			songService.doUserFavoriteSong(song.id).then(function(){
				song.favorited=true;
			});
		} else {
			$location.path('/login');
		}
	}
	$scope.removeFavorite = function(song){
		if($cookies.get('auth')){
			songService.doUserFavoriteSong(song.id).then(function(){
				song.favorited=false;
			});
		} else {
			$location.path('/login');
		}
	}
	$scope.addFollow = function(userId){
		userService.doFollow(userId);
	}
	$scope.removeFollow = function(userId){
		userService.doFollow(userId);
	}

}]);