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
	.when('/home', {
		controller:'HomeController',
		templateUrl: 'views/home.html',
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
myApp.run(["$rootScope", "$location", 'userService',
	function($rootScope, $location, userService){
		$rootScope.$on("$routeChangeStart",
			function(event, next, current){
				if(next.$$route.authenticated){
					if(!userService.getAuthStatus()){
						$location.path('/login');
					}
				}

				if(next.$$route.originPath=='/'){
					console.log('login page');
					if(userService.getAuthStatus()){
						$location.path(current.$$route.originPath);
					}
				}
			});
	}
]);