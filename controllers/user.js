var myApp = angular.module('myApp');

myApp.controller('UserController', ['$scope', '$http', 'userService', '$location', '$routeParams', function($scope, $http, userService, $location, $routeParams){
	console.log('UserController loaded...');
	$scope.getUserByAuth = function(){
		$scope.data = [];
		userService.doGetUserByAuth($scope.data);
	}
	$scope.getUser = function(){
		if($routeParams.username!=null){
			console.log($routeParams.username);
			var username = $routeParams.username;
			$scope.data = [];
			$scope.data.username = username;
			userService.doGetUserByUsername($scope.data);
		} else if($routeParams.id!=null){
			var id = $routeParams.id;
			$scope.data = [];
			$scope.data.id = id;
			userService.doGetUserById($scope.data);
		}
	}
	$scope.editUser = function(data){
		userService.doEditUser(data);
	}
}]).directive('fileModel', ['$parse', function ($parse) {
	return {
	   restrict: 'A',
	   link: function(scope, element, attrs) {
		  var model = $parse(attrs.fileModel);
		  var modelSetter = model.assign;
		  
		  element.bind('change', function(){
			 scope.$apply(function(){
				modelSetter(scope, element[0].files[0]);
			 });
		  });
	   }
	};
 }]);