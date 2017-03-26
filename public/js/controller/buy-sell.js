angular.module('buySell', [])
    .controller('buysellController', ['$scope', '$http', '$location', '$timeout', function($scope, $http, $location, $timeout) {
        $scope.rollno = $location.search().user;
        $scope.price = null;
        $scope.description = null;
        $scope.title = null;
        $scope.imgurl = null;
        var requesturl = 'https://sheltered-refuge-21205.herokuapp.com/';
        $scope.activeTab = 1;
        $scope.selectTab = function(option) {
            $scope.activeTab = option;
        }
        $scope.selectedTab = function(option) {
            return $scope.activeTab === option;
        }
        $scope.displayBids = function() {
            console.log($scope.rollno);
            $http.get(requesturl + 'bids', {
                params: {
                    userid: $scope.rollno
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
            if (selectedQuotedPrice == '') {
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
                    userid: $scope.rollno,
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
        $scope.getAllInterests = function() {
            $http.get(requesturl + 'interests', {
                params: {
                    userid: $scope.rollno
                }
            }).then(function(response) {
                    console.log(response);
                    $scope.GetAllInterestsResponse = response;
                },
                function(response) {
                    console.log(response);
                });
        }
        $scope.createOffer = function() {
            $http({
                method: 'POST',
                url: requesturl + 'createoffer',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    price: $scope.price,
                    description: $scope.description,
                    title: $scope.title,
                    sellerid: $scope.rollno,
                    url: $scope.imgurl === null ? 'http://i.imgur.com/Tsarg55.jpg' : $scope.imgurl
                }
            }).then(function(response) {
                    console.log(response);
                    $scope.createOfferResponse = response;
                },
                function(response) {
                    console.log(response);
                });
        }
    }]);
