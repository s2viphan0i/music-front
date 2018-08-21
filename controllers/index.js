var myApp = angular.module('myApp');

myApp.controller('IndexController', ['$scope', '$http', 'playlistService', 'userService', '$cookies', '$location', '$routeParams', function($scope, $http, playlistService, userService, $cookies, $location, $routeParams){
	console.log('IndexController loaded...');

	$scope.checkNavPage = function(){
		return _.contains(["/login", "/logout", "/register", "/forgot"], $location.path());
    }
    
    $scope.checkHomePage = function(){
		return _.contains(["/home", "/test"], $location.path());
	}

	$scope.checkBlackPage = function(){
		return $location.path().match(/song/)||location.hash.match(/playlist/)?true:false;
	}

	$scope.search = function(key){
		$location.path('/search').search({keyword: key, type: $routeParams.type});
	}

	$scope.$watch(function() { return $cookies.get('auth'); }, function(newValue) {
        $scope.data = {
			auth : $cookies.get('auth'),
			cookie : {
				username : $cookies.get('username'),
				fullname : $cookies.get('fullname'),
				avatar : $cookies.get('avatar'),
			}
		};
		if($cookies.get('auth')){
			userService.doUserGetFollowing($scope.data);
			playlistService.doGetAllUserPlaylist($scope.data);
		}
    });

	$scope.logout = function(){
		$scope.data.auth = null;
		$scope.cookie = null;
		userService.doLogout();
	}
	
	$scope.searchSong = function(){
		console.log($scope.data.search.key);
	}
}]);