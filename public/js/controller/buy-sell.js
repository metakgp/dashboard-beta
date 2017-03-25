angular.module('buySell', [])
    .controller('buysellController', ['$scope', '$http', '$location', '$timeout', function($scope, $http, $location, $timeout) {
        var rollno = $location.search().user;
        var requesturl = 'https://sheltered-refuge-21205.herokuapp.com/';
        $scope.activeTab = 1;
        $scope.selectTab = function(option) {
            $scope.activeTab = option;
        }
        $scope.selectedTab = function(option) {
            return $scope.activeTab === option;
        }
        $scope.displayBids = function() {
            console.log(rollno);
            $http({
                method: 'GET',
                url: requesturl + 'bids',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    userid: rollno
                }
            }).then(function(response) {
                    console.log(response);
                    $scope.displayBidsResponse = response.data;
                },
                function(response) {
                    console.log(response);
                });
        }
        $scope.isUndefinedOrNull = function(val) {
            return angular.isUndefined(val) || val === null
        }
        $scope.sendInterest = function(ind, pk) {
            var bidlistId = "bidsList_" + ind;
            var selectedQuotedPrice = document.getElementsByName(bidlistId)['1'].value;
            if (selectedQuotedPrice==''){
                selectedQuotedPrice = '0';
            }
            selectedQuotedPrice = parseInt(selectedQuotedPrice);
            $http({
                method: 'POST',
                url: requesturl + 'sendinterest',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    userid: rollno,
                    itemid: pk,
                    quoted_price: selectedQuotedPrice
                }
            }).then(function(response) {
                    console.log(response);
                    // $scope.sendInterestResponse = response;
                },
                function(response) {
                    console.log(response);
                });
        }
    }]);
