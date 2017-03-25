angular.module('buySell', [])
    .controller('buysellController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
        $scope.activeTab = 1;
        $scope.selectTab = function(option) {
            $scope.activeTab = option;
        }
        $scope.selectedTab = function(option) {
            return $scope.activeTab === option;
        }
    }]);
