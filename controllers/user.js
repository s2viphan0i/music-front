var myApp = angular.module('myApp');

myApp.controller('UserController', ['$scope', '$http', '$cookies', 'playlistService', 'userService', 'songService', '$location', '$routeParams', function($scope, $http, $cookies, playlistService, userService, songService, $location, $routeParams){
	console.log('UserController loaded...');
	$scope.getUserByAuth = function(){
		$scope.data = [];
		userService.doGetUserByAuth($scope.data);
	}
	$scope.dateOptions = {
		onClose: (value, picker, $element) => {
			$element.focus()
		},
		dateFormat: 'dd-mm-yy'
	}
	$scope.getUser = function(callback){
		if($routeParams.username!=null){
			$scope.data = {
				user : {
					username : $routeParams.username
				}
			};
			if($cookies.get('auth')){
				userService.doUserGetUserByUsername($scope.data).then(function(){
					$scope.getSongByUser(1);
				});
			} else{
				userService.doGetUserByUsername($scope.data).then(function(){
					$scope.getSongByUser(1);
				});
			}
		} else if($routeParams.id!=null){
			$scope.data = {
				user : {
					id : $routeParams.id
				}
			};
			if($cookies.get('auth')){
				userService.doUserGetUserById($scope.data).then(function(){
					$scope.getSongByUser(1);
				});
			} else{
				userService.doGetUserById($scope.data).then(function(){
					$scope.getSongByUser(1);
				});
			}
		}
	}
	$scope.getSongByUser = function(page){
		$scope.current=1;
		$scope.data.page = page;
		if(page==1){
			$scope.data.listResult = [];
		}
		if($cookies.get('auth')){
			songService.doUserGetSongByUserId($scope.data);
		} else{
			songService.doGetSongByUserId($scope.data);
		}
	}
	$scope.getPlaylistByUser = function(page){
		$scope.current=2;
		$scope.data.page = page;
		if(page==1){
			$scope.data.listResult = [];
		}
		if($cookies.get('auth')){
			playlistService.doUserGetPlaylistByUserId($scope.data);
		} else{
			playlistService.doGetPlaylistByUserId($scope.data);
		}
	}
	$scope.addFollow = function(id){
		userService.doFollow(id);
	}
	$scope.removeFollow = function(id){
		userService.doFollow(id);
	}
	$scope.editUser = function(){
		userService.doEditUser($scope.data);
	}
	$scope.isCurrent = function(username){
		return username == $cookies.get("username");
	}
}]);