var myApp = angular.module('myApp');

myApp.controller('AuthController', ['$scope', '$http', 'userService', '$location', '$routeParams', function($scope, $http, userService, $location, $routeParams){
	console.log('AuthController loaded...');

	$scope.login = function(data){
		userService.doLogin(data).then(function(){
        })
	}
	$scope.reset = function(){
		$scope.user.username = '';
		$scope.user.password = '';
	}
	$scope.sendForgotPIN = function(data){
		userService.doSendForgotPIN(data);
	}
	$scope.changePassword = function(data){
		if(data.password!=data.password2){
			data.success=false;
			data.msg="Mật khẩu không giống nhau";
		}else{
			userService.doChangePassword(data);
		}
	}
	$scope.register = function(data){
		userService.doRegister(data).then(function(){
        })
	}
	$scope.logout = function(){
		userService.doLogout().then(function(){
        })
	}
}]);