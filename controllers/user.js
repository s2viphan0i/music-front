var myApp = angular.module('myApp');

myApp.controller('UserController', ['$scope', '$http', '$cookies', 'userService', '$location', '$routeParams', function($scope, $http, $cookies, userService, $location, $routeParams){
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
	$scope.getUser = function(){
		if($routeParams.username!=null){
			$scope.data = {
				user : {
					username : $routeParams.username
				}
			};
			if($cookies.get('auth')){
				userService.doUserGetUserByUsername($scope.data);
			} else{
				userService.doGetUserByUsername($scope.data);
			}
		} else if($routeParams.id!=null){
			$scope.data = {
				user : {
					id : $routeParams.id
				}
			};
			if($cookies.get('auth')){
				userService.doUserGetUserById($scope.data);
			} else{
				userService.doGetUserById($scope.data);
			}
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