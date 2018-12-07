var myApp = angular.module('myApp');

myApp.controller('PlaylistController', ['$scope', '$http', 'playerService', 'playlistService', 'userService', '$cookies', '$location', '$routeParams', function ($scope, $http, playerService, playlistService, userService, $cookies, $location, $routeParams) {
    console.log('PlaylistController loaded...');
    $scope.getPlaylistById = function () {
        $scope.data.playlist = {
            id: $routeParams.id
        }
        playlistService.doGetPlaylistById($scope.data, function () {
            // userService.doGetUserById($scope.data.playlist);
        });
    }
    $scope.playPlaylist = function(index){
        playerService.Play({
            songs: $scope.data.playlist.songs,
            playlist: true,
            start: index
        });
    }
    $scope.checkOwner = function(){
		if($cookies.get('token')&&$scope.data.playlist.user){
			return $cookies.get('username') == $scope.data.playlist.user.username;
		}
		return false;
    }
    $scope.showEditPlaylist = function(){
		$scope.data.msg = '';
		$scope.data.success = undefined;
		if($scope.data.playlist){
			$scope.data.selected = {
				playlist : angular.copy($scope.data.playlist)
			}
		}
		$scope.showEditPlaylistModal=true;
	}
	$scope.hideEditPlaylist = function(){
		$scope.showEditPlaylistModal=false;
	}
	$scope.editPlaylist = function(){
		playlistService.doEditPlaylist($scope.data);
	}
	$scope.deletePlaylist = function(){
		playlistService.doDeletePlaylist($scope.data);
	}
}]);