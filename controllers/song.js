var myApp = angular.module('myApp');

myApp.controller('SongController', ['$scope', '$http', '$cookies', 'userService', 'songService', 'playerService', '$location', '$routeParams', function($scope, $http, $cookies, userService, songService, playerService, $location, $routeParams){
	console.log('SongController loaded...');
	$scope.initAddSong = function(){
		$scope.data = [];
		$scope.status = true;
		userService.doGetUserByAuth($scope.data);
		songService.doGetAllGenres($scope.data);
	}
	$scope.init = function(){
		$scope.data = [];
		$scope.auth = $cookies.get('auth');
		$scope.username = $cookies.get('username');
		$scope.fullname = $cookies.get('fullname');
		$scope.avatar = $cookies.get('avatar');
	}
	$scope.getSongById = function(){
		$scope.data = [];
		$scope.data.songId = $routeParams.id;
		if($cookies.get('auth')){
			songService.doUserGetSongById($scope.data, function(){
				$scope.data.song.lyric = unescape($scope.data.song.lyric);
				playerService.Play({
					StreamUri:"http://localhost:8080/resource/audio?name="+$scope.data.song.url,
					Title: ""
				});
			});
			
		} else{
			songService.doGetSongById($scope.data, function(){
				$scope.data.song.lyric = unescape($scope.data.song.lyric);
				playerService.Play({
					StreamUri:"http://localhost:8080/resource/audio?name="+$scope.data.song.url,
					Title: ""
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
    $scope.addSong = function(data){
		songService.doAddSong(data);
	}
}]).directive('fileModel', ['$parse', function ($parse) {
	return {
	   restrict: 'A',
	   link: function(scope, element, attrs) {
		  var model = $parse(attrs.fileModel);
		  var modelSetter = model.assign;
		  
		  element.bind('change', function(){
			 scope.$apply(function(){
				modelSetter(scope, element[0].files[0]);
			 });
		  });
	   }
	};
 }]);