var myApp = angular.module('myApp');

myApp.controller('SearchController', ['$scope', '$http', '$cookies', 'userService', 'songService', 'playerService', '$location', '$routeParams', function($scope, $http, $cookies, userService, songService, playerService, $location, $routeParams){
	console.log('SearchController loaded...');
	$scope.init = function(){
		
	}
	$scope.getSongByKeyword = function(page){
		$(".nav-tabs li").removeClass("active");
		$("#song-tab").addClass("active");
		$(".tab-content .tab-pane").removeClass("active");
		$("#song").addClass("active");
		$scope.data = [];
		var search = {
			keyword: "",
			page: page
		}
        if($routeParams.keyword){
			search.keyword = $routeParams.keyword;
		}
		
		$scope.page = search.page;
		$scope.keyword = search.keyword;
		if($cookies.get('auth')){
			songService.doUserGetSongByKeyword($scope.data, search, function(){
				$scope.totalPage = Math.ceil($scope.data.total/18);
				$scope.total = $scope.data.total;
			});
		} else{
			songService.doGetSongByKeyword($scope.data, search, function(){
				$scope.totalPage = Math.ceil($scope.data.total/18);
				$scope.total = $scope.data.total;
			});
		}

	}
	$scope.getUserByKeyword = function(page){
		$(".nav-tabs li").removeClass("active");
		$("#user-tab").addClass("active");
		$(".tab-content .tab-pane").removeClass("active");
		$("#user").addClass("active");
		$scope.data = [];
		var search = {
			keyword: "",
			page: page
		}
        if($routeParams.keyword){
			search.keyword = $routeParams.keyword;
		}
		
		$scope.page = search.page;
		$scope.keyword = search.keyword;
		if($cookies.get('auth')){
			userService.doUserGetUserByKeyword($scope.data, search, function(){
				$scope.totalPage = Math.ceil($scope.data.total/18);
				$scope.total = $scope.data.total;
			});
		} else{
			songService.doGetUserByKeyword($scope.data, search, function(){
				$scope.totalPage = Math.ceil($scope.data.total/18);
				$scope.total = $scope.data.total;
			});
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
	$scope.addFollow = function(userId){
		userService.doFollow(userId);
	}
	$scope.removeFollow = function(userId){
		userService.doFollow(userId);
	}

}]);