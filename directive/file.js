var myApp = angular.module('myApp');

myApp.directive('fileModel', ['$parse', function ($parse) {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			var model = $parse(attrs.fileModel);
			var modelSetter = model.assign;

			element.bind('change', function () {
				scope.$apply(function () {
					modelSetter(scope, element[0].files[0]);
				});
				if (element[0].files && element[0].files[0]) {
					var reader = new FileReader();

					reader.onload = function (e) {
						$('.preview').attr('src', e.target.result);
					}

					reader.readAsDataURL(element[0].files[0]);
				}
			});
		}
	};
}]);