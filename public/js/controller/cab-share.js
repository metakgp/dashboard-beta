angular.module('cabShare', [])
    .controller('cabshareController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
        $scope.successSearch = null;
        // $scope.successPost = null;
        $scope.successAll = null;

        var minDate = new Date().getDate();
        $scope.minDateStr = String(minDate);
        const requesturl = 'http://139.59.79.173/';
        $scope.searchSelectedDestination = null;
        $scope.postSelectedDestination = null;
        $scope.searchButton = "Destination";
        $scope.postButton = "Destination";
        $scope.destinations = ['Kolkata Airport', 'Mandarmani', 'Howrah station', 'Digha beach', 'KGP station', 'Hijli station', 'Dominos', 'Flavours'];
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
                    $scope.successSearch = response.data.data;
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
            $http({
                method: 'POST',
                url: requesturl + 'post-cab',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    name: $scope.name,
                    emailid: $scope.email,
                    number: $scope.contact,
                    availSeats: $scope.seats,
                    source: 'KGP',
                    dest: $scope.postSelectedDestination,
                    date: $scope.date,
                    time: $scope.time,
                    threshold: $scope.threshold
                }
            }).then(function(response) {
                    console.log(response);
                    $scope.successPost = response.data.success;
                },
                function(response) {
                    console.log(response);
                });
        }
        $scope.postChange = function(name) {
            $scope.postButton = name;
            $scope.postSelectedDestination = name;
        }
        $scope.activeTab = 1;
        $scope.selectTab = function(option) {
            $scope.activeTab = option;
        }
        $scope.selectedTab = function(option) {
            return $scope.activeTab === option;
        }
        $scope.getAllCabs = function() {
            $http({
                method: 'GET',
                url: requesturl + 'get-all-cabs',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                }
            }).then(function(response) {
                    console.log(response);
                    $scope.successAll = response.data.data;
                },
                function(response) {
                    console.log(response);
                });
        }
    }]);
