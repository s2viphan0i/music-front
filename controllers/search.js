var myApp = angular.module('myApp');

myApp.controller('SearchController', ['$scope', '$http', '$cookies', 'playlistService', 'userService', 'songService', 'playerService', '$location', '$routeParams', function($scope, $http, $cookies, playlistService, userService, songService, playerService, $location, $routeParams){
	console.log('SearchController loaded...');
	$scope.data = {
		keyword : "",
		sort : 2,
		genre : [],
		page : 1
	}

	$scope.search = function(page){
		$scope.data.page = page;
        if($routeParams.keyword){
			$scope.data.keyword = $routeParams.keyword;
		}
		if($routeParams.sort){
			$scope.data.sort = $routeParams.sort;
			switch($scope.data.sort){
				case "1":
					$scope.data.sortField = "title";
					break;
				case "2":
					$scope.data.sortField = "views";
					break;
				case "3":
					$scope.data.sortField = "favorites";
					break;
				case "4":
					$scope.data.sortField = "create_time";
					break;
			}
		}
		if($routeParams.genre){
			for(var g in $scope.genres){
				if($scope.genres[g].id==$routeParams.genre){
					$scope.data.genre = $scope.genres[g];
				}
			}
		}
		if($routeParams.type){
			$scope.data.type = $routeParams.type;
		} else{
			$scope.data.type = "song";
		}
		switch($scope.data.type){
			case "song":
				$(".nav-tabs li").removeClass("active");
				$("#song-tab").addClass("active");
				$(".tab-content .tab-pane").removeClass("active");
				$("#song").addClass("active");
				if($cookies.get('token')){
					songService.doUserGetSongByKeyword($scope.data);
				} else{
					songService.doGetSongByKeyword($scope.data);
				}
				break;
			case "user":
				$(".nav-tabs li").removeClass("active");
				$("#user-tab").addClass("active");
				$(".tab-content .tab-pane").removeClass("active");
				$("#user").addClass("active");
				if($cookies.get('token')){
					userService.doUserGetUserByKeyword($scope.data);
				} else{
					userService.doGetUserByKeyword($scope.data);
				}
				break;
			case "playlist":
				$(".nav-tabs li").removeClass("active");
				$("#playlist-tab").addClass("active");
				$(".tab-content .tab-pane").removeClass("active");
				$("#playlist").addClass("active");
				playlistService.doGetPlaylistByKeyWord($scope.data);
				break;
			case "loved":
				$(".nav-tabs li").removeClass("active");
				$("#loved-tab").addClass("active");
				$(".tab-content .tab-pane").removeClass("active");
				$("#loved").addClass("active");
				songService.doUserGetListFavoriteSong($scope.data);
				break;
			case "history":
				$(".nav-tabs li").removeClass("active");
				$("#history-tab").addClass("active");
				$(".tab-content .tab-pane").removeClass("active");
				$("#history").addClass("active");
				songService.doUserGetListViewSong($scope.data);
				break;
		}
		console.log($scope.data);
	}
	$scope.addFollow = function(userId){
		userService.doFollow(userId);
	}
	$scope.removeFollow = function(userId){
		userService.doFollow(userId);
	}

}]);