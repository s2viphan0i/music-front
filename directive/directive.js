var myApp = angular.module('myApp');

myApp.directive("jplayer", ['$window', 'playerService', function ($window, playerService) {
    return {
        restrict: "E",
        // Have our own scope - we only want to watch the service and not conflict with other scopes
        scope: {},
        // Serve up some html with our player
        templateUrl: "views/jplayer_template.html",
        link: function (scope, element, attrs) {
            // An element on the page to attach the jPlayer to. Could also use "element" from linkFN ^
            var jPlayer = $('#jplayer_N').jPlayer();
            
            // Point to the css
            $window.jplayerCss = "#jp_container_N";
            // Set up a playlist
            $window.myPlaylist = new jPlayerPlaylist({
                jPlayer: "#jplayer_N",
                cssSelectorAncestor: jplayerCss,
                repeat: function (e) {
                    // Implement repeat from the service
                }
            }, [], { supplied: 'mp3', swfPath: "obj/", free: true }, 0);

            // Add the player service to the scope so we can watch stuff!
            scope.playerService = playerService;

            // When the Current track (on the service) changes - we want to tell jPlayer to play that new song
            scope.$watch('playerService.CurrentTrack', function (value) {
                if (value != null) {
                    jPlayer.jPlayer('setMedia', {
                        // The url of the mp3 file
                        mp3: value.StreamUri,
                        title: value.Title 
                    }).jPlayer('play');
                }
            });

            // Pausing is controlled from a service (so many things can toggle it).
            // So watch it an control jPlayer when it changes
            scope.$watch('playerService.IsPaused', function (value) {
                if (value != null) {
                    if (value == true) {
                        jPlayer.jPlayer('pause');
                    }
                    else {
                        jPlayer.jPlayer('play');
                    }
                }
            });

            jPlayer.bind($.jPlayer.event.ended, function (event) {
                // Song has ended, try to go next
                if (scope.playerService.HasNext) {
                    scope.playerService.Next();
                }
            });

            scope.$on('$destroy', function () {
                // Clean up memory from the events 
                jPlayer.unbind($.jPlayer.event.ended);
                playerService.CurrentTrack = null;
                jPlayer.unbind($.jPlayer.event.play);
                // Don't think we'll ever destroy it (it's on every page) - and why would you want to?
                jPlayer.jPlayer('destroy');
                
            });
        }
    };
}]);