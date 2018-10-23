var myApp = angular.module('myApp');

myApp.directive('song', ['playlistService', 'songService', 'playerService', '$cookies', function (playlistService, songService, playerService, $cookies) {
    return {
        templateUrl: 'views/song_template.html',
        restrict: 'E',
        replace: true,
        scope:{             
            song:'=',
            showAddPlaylist:"&showAddPlaylist",
            showEditSong:"&showEditSong"
        },
        link: function postLink(scope, element, attrs) {
            scope.playSong = function(){
                playerService.Play({
                    id: scope.song.id,
                    StreamUri:"http://localhost/resource/audio/"+scope.song.url,
                    title: scope.song.title,
                    artist: scope.song.user.fullname,
                    add: false
                });
            }
            scope.addSongToPlaying = function(){
                playerService.Play({
                    id: scope.song.id,
                    StreamUri:"http://localhost/resource/audio/"+scope.song.url,
                    title: scope.song.title,
                    artist: scope.song.user.fullname,
                    add: true
                });
            }
            scope.addFavorite = function(){
                if($cookies.get('auth')){
                    songService.doUserFavoriteSong(scope.song.id).then(function(){
                        scope.song.favorited=true;
                        scope.song.favorites=song.favorites+1;
                    });
                } else {
                    $location.path('/login');
                }
            }
            scope.removeFavorite = function(){
                if($cookies.get('auth')){
                    songService.doUserFavoriteSong(scope.song.id).then(function(){
                        scope.song.favorited=false;
                        scope.song.favorites=song.favorites-1;
                    });
                } else {
                    $location.path('/login');
                }
            }
        }
    };
}]);