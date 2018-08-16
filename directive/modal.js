var myApp = angular.module('myApp');

myApp.directive('modal', function () {
    return {
        templateUrl: 'views/modal_template.html',
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: {
            visible: '=',
            onShown: '&',
            onHide: '&'
        },
        link: function postLink(scope, element, attrs) {

            $(element).modal({
                show: false,
                keyboard: attrs.keyboard,
                backdrop: attrs.backdrop
            });

            scope.$watch(function () {
                return scope.visible;
            }, function (value) {
                if (value == true) {
                    $(element).modal('show');
                } else {
                    $(element).modal('hide');
                }
            });

            $(element).on('shown.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = true;
                });
            });

            $(element).on('shown.bs.modal', function () {
                scope.$apply(function () {
                    scope.onShown({});
                });
            });

            $(element).on('hidden.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = false;
                });
            });

            $(element).on('hidden.bs.modal', function () {
                scope.$apply(function () {
                    scope.onHide({});
                });
            });
        }
    };
});

myApp.directive('modalHeader', function () {
    return {
        template: '<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close">&times;</button><h5 class="modal-title">{{title}}</h5></div>',
        replace: true,
        restrict: 'E',
        scope: {
            title: '@'
        }
    };
});

myApp.directive('modalBody', function () {
    return {
        template: '<div class="modal-body" ng-transclude></div>',
        replace: true,
        restrict: 'E',
        transclude: true
    };
});

myApp.directive('modalFooter', function () {
    return {
        template: '<div class="modal-footer" ng-transclude></div>',
        replace: true,
        restrict: 'E',
        transclude: true
    };
});