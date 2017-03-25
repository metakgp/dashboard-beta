angular.module('cabShare', [])
    .controller('cabshareController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
        const requesturl = 'http://139.59.79.173/';
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
                method: 'POST',
                url: requesturl + 'search-cab',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: { dest: $scope.searchSelectedDestination, date: $scope.date, time: $scope.time }
            }).then(function(response) {
                    console.log(response);
                },
                function(response) {
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
        $scope.activeTab = 1;
        $scope.selectTab = function(option) {
            $scope.activeTab = option;
        }
        $scope.selectedTab = function() {
            return $scope.activeTab === 1;
        }
    }]);
