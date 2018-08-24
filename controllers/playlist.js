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
}]);