angular.module('cabShare', [])
    .controller('cabshareController', ['$scope', '$timeout', function($scope, $timeout) {
        $scope.selectedDestination = null;
        $scope.button = "Destination"
        $scope.destinations = ['Kolkata', 'Chennai'];
        $scope.triggerSearch = function() {
            console.log($scope.selectedDestination);
            console.log($scope.date);
            console.log($scope.time);
        }
        $scope.change = function(name) {
        	$scope.button = name;
            $scope.selectedDestination = name;
        }
    }]);
