angular.module('fetchNaarad', [])
    .controller('naaradDataController', ['$scope', '$http', '$window', '$timeout', function($scope, $http, $window, $timeout) {
        // $http.get('data/feed.json')
        // $http.get('https://naarad.metakgp.org/feed.json')
        $http.get('https://athityakumar.github.io/naarad-source/feed.json')
            .then(function(res) {
                $scope.naaradData = res.data;
                $scope.$broadcast('naaraddataloaded');
            });

        $scope.isUndefinedOrNull = function(val) {
            return angular.isUndefined(val) || val === null
        }
    }]);
