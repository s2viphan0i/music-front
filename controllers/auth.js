var myApp = angular.module('myApp');

myApp.controller('AuthController', ['$scope', '$http', 'userService', '$location', '$routeParams', function($scope, $http, userService, $location, $routeParams){
	console.log('AuthController loaded...');
	$scope.data = [];
	$scope.login = function(){
		userService.doLogin($scope.data).then(function(){
        })
	}
	$scope.reset = function(){
		$scope.user.username = '';
		$scope.user.password = '';
	}
	$scope.sendForgotPIN = function(){
		userService.doSendForgotPIN($scope.data);
	}
	$scope.changePassword = function(){
		if($scope.data.password!=$scope.data.password2){
			$scope.data.success=false;
			$scope.data.msg="Mật khẩu không giống nhau";
		}else{
			userService.doChangePassword($scope.data);
		}
	}
	$scope.register = function(){
		userService.doRegister($scope.data).then(function(){
        })
	}
	$scope.logout = function(){
		userService.doLogout();
	}
}]);