angular.module('calendar', [])
    .controller('calendarController', ['$scope', '$http', function($scope, $http) {
        const requesturl = 'http://139.59.35.210/';
        console.log("Initiating get all events");
        $scope.getAllEvents = function() {
            $http({
                method: 'GET',
                url: requesturl + 'all-events',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                }
            }).then(function(response) {
                    console.log(response);
                    $scope.successAllEvents = response.data;
                },
                function(response) {
                    console.log(response);
                });
        }
    }]);
