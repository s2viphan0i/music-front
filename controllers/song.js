var myApp = angular.module('myApp');

myApp.controller('SongController', ['$scope', '$http', '$cookies', 'commentService', 'userService', 'songService', 'playerService', '$location', '$routeParams', function($scope, $http, $cookies, commentService, userService, songService, playerService, $location, $routeParams){
	console.log('SongController loaded...');
	$scope.initAddSong = function(){
		$scope.data = [];
		$scope.status = true;
		userService.doGetUserByAuth($scope.data);
		songService.doGetAllGenres($scope.data);
	}
	$scope.deleteComment = function(id){
		$scope.showModal = true;
		$scope.selected = id;
	}
	$scope.cancelDeleteComment = function(){
		$scope.showModal = false;
	}
	$scope.getSongById = function(){
		$scope.showModal = false;
		$scope.data = [];
		if($cookies.get('auth')){
			$scope.data.auth = $cookies.get('auth');
			$scope.data.username = $cookies.get('username');
			$scope.data.fullname = $cookies.get('fullname');
			$scope.data.avatar = $cookies.get('avatar');
		}
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
		commentService.doUserAddComment($scope.data, function(){
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
		console.log($scope);
		$scope.data.songId = $routeParams.id;
		$scope.data.page = page;
		commentService.doGetCommentBySongId($scope.data, function(){
			moment.locale("vi");
			$scope.data.listComment.forEach(comment => {
				comment.content = unescape(comment.content);
				comment.createTimeFrom = moment(comment.createTime, "DD-MM-YYYY hh:mm:ss").fromNow();
			});
			console.log($scope.data.listComment);
		});
	}
	$scope.confirmDeleteComment = function(id){
		$scope.data.comment={
			id : id
		}
		commentService.doUserDeleteComment($scope.data, function(){
			$scope.showModal = false;
			for(var i = 0; i < $scope.data.listComment.length; i++) {
				if($scope.data.listComment[i].id == id) {
					$scope.data.listComment.splice(i, 1);
					break;
				}
			}
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