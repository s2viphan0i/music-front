var myApp = angular.module('myApp', ['ngRoute', 'ngCookies', 'ui.date']);

myApp.config(function ($routeProvider) {
	$routeProvider.when('/login', {
			controller: 'AuthController',
			templateUrl: 'views/signin.html',
			authenticated: false
		})
		.when('/register', {
			controller: 'AuthController',
			templateUrl: 'views/signup.html',
			authenticated: false
		})
		.when('/forgot', {
			controller: 'AuthController',
			templateUrl: 'views/forgot.html',
			authenticated: false
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
			authenticated: false
		})
		.when('/profile', {
			controller: 'UserController',
			templateUrl: 'views/profile.html',
			authenticated: true
		})
		.when('/upload', {
			controller: 'UploadController',
			templateUrl: 'views/upload.html',
			authenticated: true
		})
		.when('/song/:id', {
			controller: 'SongController',
			templateUrl: 'views/song.html',
			authenticated: false
		})
		.when('/playlist/:id', {
			controller: 'PlaylistController',
			templateUrl: 'views/playlist.html',
			authenticated: false
		})
		.when('/test', {
			controller: 'HomeController',
			templateUrl: 'views/test.html',
			authenticated: false
		})
		.when('/search', {
			controller: 'SearchController',
			templateUrl: 'views/search.html',
			authenticated: false
		})
		.when('/yours', {
			controller: 'SearchController',
			templateUrl: 'views/yours.html',
			authenticated: false
		})
		.when('/dashboard', {
			controller: 'AdminController',
			templateUrl: 'views/dashboard.html',
			authenticated: true
		})
		.when('/404', {
			templateUrl: 'views/404.html',
			authenticated: false
		})
		.otherwise({
			redirectTo: '/404'
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


