var myApp = angular.module('myApp',['ngRoute', 'ngCookies']);

myApp.config(function($routeProvider){
	$routeProvider.when('/login', {
		controller:'AuthController',
		templateUrl: 'views/signin.html'
	})
	.when('/register', {
		controller:'AuthController',
		templateUrl: 'views/signup.html'
	})
	.when('/forgot', {
		controller:'AuthController',
		templateUrl: 'views/forgot.html'
	})
	.when('/home', {
		controller:'HomeController',
		templateUrl: 'views/home.html',
		authenticated: true
	})
	.when('/logout', {
		controller:'AuthController',
		templateUrl: 'views/logout.html',
		authenticated: true
	})
	.when('/edit-profile', {
		controller:'UserController',
		templateUrl: 'views/edit_profile.html',
		authenticated: true
	})
	.when('/photos/:key', {
		controller:'PhotoController',
		templateUrl: '/views/photos.html'
	})
	.when('/photos/details/:id',{
		controller:'PhotoController',
		templateUrl: 'views/book_details.html'
	})
	.when('/photos/edit/:id',{
		controller:'PhotoController',
		templateUrl: 'views/edit_book.html'
	})
	.otherwise({
		redirectTo: '/login'
	});
});
myApp.run(["$rootScope", "$location", "$cookies", 'userService',
	function($rootScope, $location, $cookies, userService){
		$rootScope.$on("$routeChangeStart",
			function(event, next, current){
				if(next.$$route.authenticated){
					if(!userService.getAuthStatus()){
						$location.path('/login');
					}
				}
				if(next.$$route.originalPath=='/login'||next.$$route.originalPath=='/register'||next.$$route.originalPath=='/forgot'){
					if(userService.getAuthStatus()){
						$location.path('/home');
					}
				}
				if(next.$$route.originalPath=='/logout'){
					$rootScope.username = "";
					$rootScope.fullname = "";
					$rootScope.avatar = "";
				}
			});
		$rootScope.username = $cookies.get('username');
		$rootScope.fullname = $cookies.get('fullname');
		$rootScope.avatar = $cookies.get('avatar');
	}
]);