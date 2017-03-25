angular.module('cabShare', [])
    .controller('cabshareController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
        // const requesturl = 'http://139.59.79.173/';
        const requesturl = 'http://192.168.43.7:5000/';
        // const requesturl = 'http://127.0.0.1:5000/';
        $scope.searchSelectedDestination = null;
        $scope.postSelectedDestination = null;
        $scope.searchButton = "Destination";
        $scope.postButton = "Destination";
        $scope.destinations = ['kolAirport'];
        $scope.triggerSearch = function() {
            console.log($scope.searchSelectedDestination);
            console.log($scope.date);
            console.log($scope.time);
            $http({
                    url: requesturl + '/search-cab',
                    method: "POST",
                    data: {
                        'dest': $scope.searchSelectedDestination,
                        'date': $scope.date,
                        'time': $scope.time
                    },
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                })
                .then(function(response) {
                        console.log(response);
                    },
                    function(response) { // optional
                        console.log(response);
                    });

        }
        $scope.searchChange = function(name) {
            $scope.searchButton = name;
            $scope.searchSelectedDestination = name;
        }
        $scope.triggerPost = function() {
            console.log($scope.postSelectedDestination);
            console.log($scope.date);
            console.log($scope.time);
        }
        $scope.postChange = function(name) {
            $scope.postButton = name;
            $scope.postSelectedDestination = name;
        }
    }]);
