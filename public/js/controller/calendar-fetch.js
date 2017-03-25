angular.module('calendar', [])
    .controller('calendarController', ['$scope', '$http', function($scope, $http) {
        const requesturl = 'http://139.59.35.210/';
        const googleurl = 'https://maps.googleapis.com/maps/api/staticmap?';
        console.log("Initiating get all events");
        var getAllMaps = function() {
            for (var i = 0; i < $scope.successAllEvents.length; ++i) {
                if ($scope.successAllEvents[i].placeLocation != null) {
                    var tempUrl = 'imgUrl' + String(i);
                    console.log(tempUrl);
                    $scope[tempUrl] = googleurl + 'markers=' + $scope.successAllEvents[i].placeLocation.longtitude + ',' + $scope.successAllEvents[i].placeLocation.latitude + '&size=1400x400&key=AIzaSyAEgf-jv7L8DKO0h3CyMf2lHLmX5jszPyc&format=PNG';
                }
            }
        }
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
                    $scope.successAllEvents = response.data.data;
                    getAllMaps();
                },
                function(response) {
                    console.log(response);
                });
        }
    }]);
