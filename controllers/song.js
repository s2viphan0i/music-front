var myApp = angular.module('myApp');

myApp.controller('SongController', ['$scope', '$http', '$cookies', 'commentService', 'userService', 'songService', 'playerService', '$location', '$routeParams', function($scope, $http, $cookies, commentService, userService, songService, playerService, $location, $routeParams){
	console.log('SongController loaded...');
	$scope.deleteComment = function(id){
		$scope.showModal = true;
		$scope.selected = id;
	}
	$scope.cancelDeleteComment = function(){
		$scope.showModal = false;
	}
	$scope.getSongById = function(){
		$scope.showDeleteModal = false;
		$scope.data = [];
		if($cookies.get('auth')){
			$scope.data.auth = $cookies.get('auth');
			$scope.data.username = $cookies.get('username');
			$scope.data.fullname = $cookies.get('fullname');
			$scope.data.avatar = $cookies.get('avatar');
		}
		$scope.data.song = {
			id : $routeParams.id
		}
		if($cookies.get('auth')){
			songService.doUserGetSongById($scope.data, function(){
				$scope.data.song.lyric = unescape($scope.data.song.lyric);
				userService.doUserGetUserById($scope.data.song);
				console.log($scope.data.song);
			});
		} else{
			songService.doGetSongById($scope.data, function(){
				$scope.data.song.lyric = unescape($scope.data.song.lyric);
				userService.doGetUserById($scope.data.song);
				console.log($scope.data.song);
			});
		}
	}
	$scope.playSong = function(){
		playerService.Play({
			id: $scope.data.song.id,
			StreamUri:"http://localhost/resource/audio/"+$scope.data.song.url,
			title: $scope.data.song.title,
			artist: $scope.data.song.user.fullname,
			add: false
		});
	}
	$scope.addSongToPlaying = function(){
		playerService.Play({
			id: $scope.data.song.id,
			StreamUri:"http://localhost/resource/audio/"+$scope.data.song.url,
			title: $scope.data.song.title,
			artist: $scope.data.song.user.fullname,
			add: true
		});
	}
	$scope.addFavorite = function(){
		songService.doUserFavoriteSong($scope.data.song.id);
	}
	$scope.removeFavorite = function(){
		songService.doUserFavoriteSong($scope.data.song.id);
	}
	$scope.addComment = function(){
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
	$scope.loadComment = function(page){
		$scope.data.songId = $routeParams.id;
		$scope.data.page = page;
		commentService.doGetCommentBySongId($scope.data, function(){
			moment.locale("vi");
			if($scope.data.listComment){
				$scope.data.listComment.forEach(comment => {
					comment.content = unescape(comment.content);
					comment.createTimeFrom = moment(comment.createTime, "DD-MM-YYYY hh:mm:ss").fromNow();
				});
			}
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
	$scope.addFollow = function(id){
		userService.doFollow(id);
	}
	$scope.removeFollow = function(id){
		userService.doFollow(id);
	}
}]);