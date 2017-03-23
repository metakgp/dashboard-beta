angular.module('fetchNaarad', [])
    .controller('naaradDataController', ['$scope', '$http', '$window', '$timeout', function($scope, $http, $window, $timeout) {
        $http.get('data/feed.json')
            .then(function(res) {
                $scope.naaradData = res.data;
            });

        $scope.isUndefinedOrNull = function(val) {
            return angular.isUndefined(val) || val === null
        }
    }]);
