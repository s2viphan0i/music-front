var myApp = angular.module('myApp');

myApp.controller('SongController', ['$scope', '$http', 'userService', 'songService', '$location', '$routeParams', function($scope, $http, userService, songService, $location, $routeParams){
	console.log('SongController loaded...');
	$scope.getUser = function(){
		$scope.data = [];
		userService.doGetUserByAuth($scope.data);
    }
    $scope.getAllGenres = function(){
        $scope.data = [];
        songService.doGetAllGenres($scope.data);
    }
    $scope.addSong = function(data){
		songService.doAddSong(data);
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