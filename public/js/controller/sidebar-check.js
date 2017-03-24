angular.module('sidebarCheck', [])
    .controller('sidebarController', ['$scope', function($scope) {
        angular.isUndefinedOrNull = function(val) {
            return angular.isUndefined(val) || val === null
        }
    }]);
