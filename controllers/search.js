var myApp = angular.module('myApp');

myApp.controller('SearchController', ['$scope', '$http', '$cookies', 'userService', 'songService', 'playerService', '$location', '$routeParams', function($scope, $http, $cookies, userService, songService, playerService, $location, $routeParams){
	console.log('SearchController loaded...');
	$scope.init = function(){
		
	}
	$scope.search = function(page){
		$scope.data = {
			keyword : "",
			page : page
		}
        if($routeParams.keyword){
			$scope.data.keyword = $routeParams.keyword;
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
					songService.doGetUserByKeyword($scope.data);
				}
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