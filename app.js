var myApp = angular.module('myApp', ['ngRoute', 'ngCookies']);

myApp.config(function ($routeProvider) {
	$routeProvider.when('/login', {
			controller: 'AuthController',
			templateUrl: 'views/signin.html'
		})
		.when('/register', {
			controller: 'AuthController',
			templateUrl: 'views/signup.html'
		})
		.when('/forgot', {
			controller: 'AuthController',
			templateUrl: 'views/forgot.html'
		})
		.when('/home', {
			controller: 'HomeController',
			templateUrl: 'views/home.html',
			authenticated: false
		})
		.when('/logout', {
			controller: 'AuthController',
			templateUrl: 'views/logout.html',
			authenticated: true
		})
		.when('/edit-profile', {
			controller: 'UserController',
			templateUrl: 'views/edit_profile.html',
			authenticated: true
		})
		.when('/profile/:username', {
			controller: 'UserController',
			templateUrl: 'views/profile.html',
			authenticated: true
		})
		.when('/profile', {
			controller: 'UserController',
			templateUrl: 'views/profile.html',
			authenticated: true
		})
		.when('/upload', {
			controller: 'SongController',
			templateUrl: 'views/upload.html',
			authenticated: true
		})
		.when('/song/:id', {
			controller: 'SongController',
			templateUrl: 'views/song.html',
			authenticated: true
		})
		.otherwise({
			redirectTo: '/home'
		});
});
myApp.run(["$rootScope", "$location", "$cookies", 'userService', 'songService',
	function ($rootScope, $location, $cookies, userService, songService) {
		$rootScope.$on("$routeChangeStart",
			function (event, next, current) {
				if (next.$$route.authenticated) {
					if (!userService.getAuthStatus()) {
						$location.path('/login');
					}
				}
				if (next.$$route.originalPath == '/login' || next.$$route.originalPath == '/register' || next.$$route.originalPath == '/forgot') {
					if (userService.getAuthStatus()) {
						$location.path('/home');
					}
				}
			});
		$rootScope.username = $cookies.get("username");
		$rootScope.fullname = $cookies.get("fullname");
		$rootScope.avatar = $cookies.get("avatar");
	}
]);