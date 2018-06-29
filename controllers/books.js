var myApp = angular.module('myApp');

myApp.controller('PhotoController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	console.log('PhotoController loaded...');

	$scope.getPhotos = function(){
		var key = $routeParams.key;
		$http.get('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=bfa1a908e3bef70cbbb0cf0058fb4aba&tags='+key+'&text='+key+'&per_page=20&page=1&format=json&nojsoncallback=1').success(function(response){
			$scope.photos = response.photos.photo;
		});
	}

	$scope.getPhoto = function(){
		var id = $routeParams.id;
		$http.get('/api/books/'+id).success(function(response){
			$scope.photo = response;
		});
	}

	$scope.addPhoto = function(){
		console.log($scope.photo);
		$http.post('/api/books/', $scope.photo).success(function(response){
			window.location.href='#/photos';
		});
	}

	$scope.updatePhoto = function(){
		var id = $routeParams.id;
		$http.put('/api/books/'+id, $scope.photo).success(function(response){
			window.location.href='#/photos';
		});
	}

	$scope.removePhoto = function(id){
		$http.delete('/api/books/'+id).success(function(response){
			window.location.href='#/photos';
		});
	}

	$scope.$on('$viewContentLoaded', function(event)
	{ 
		
 	});
}]);
