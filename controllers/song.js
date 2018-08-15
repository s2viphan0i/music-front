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
			});
		} else{
			songService.doGetSongById($scope.data, function(){
				$scope.data.song.lyric = unescape($scope.data.song.lyric);
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
		songService.doUserFavoriteSong(songId);
	}
	$scope.removeFavorite = function(songId){
		songService.doUserFavoriteSong(songId);
	}
    $scope.addSong = function(data){
		songService.doAddSong(data);
	}
	$scope.comment = function(songId){
		$scope.data.song.id = songId;
		songService.doUserAddComment($scope.data, function(){
			$scope.data.c.createTimeFrom = moment($scope.data.c.createTime, "DD-MM-YYYY hh:mm:ss").fromNow();
			if($scope.data.listComment){
				$scope.data.c.content = unescape($scope.data.c.content);
				$scope.data.listComment.push($scope.data.c);
			} else{
				$scope.data.c.content = unescape($scope.data.c.content);
				$scope.data.listComment = [];
				$scope.data.listComment.push($scope.data.c);
			}
			$scope.data.comment.content = "";
		});
	}
	$scope.loadComment =  function(page){
		if($cookies.get('avatar')){
			$scope.data.avatar = $cookies.get('avatar');
		}
		$scope.data.songId = $routeParams.id;
		$scope.data.page = page;
		songService.doGetCommentBySongId($scope.data, function(){
			moment.locale("vi");
			$scope.data.listComment.forEach(comment => {
				comment.content = unescape(comment.content);
				comment.createTimeFrom = moment(comment.createTime, "DD-MM-YYYY hh:mm:ss").fromNow();
			});
			console.log($scope.data.listComment);
		});
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