angular.module('getTimeTable', [])
    .controller('timetableController', ['$scope', '$location', '$sce', 'TimeTables', function($scope, $location, $sce, TimeTables) {
        var rollno = $location.search().user;
        TimeTables.getTTHtml(rollno)
            .then(function(data) {
                var ttfh = "'" + data.data + "'";
                $scope.timetableFromHtml = $sce.trustAsHtml(ttfh);
            });

        $scope.downloadTT = function() {
            console.log("Initiating timetable download");
            path = "/api/downloadICS/" + $scope.rollno.toLowerCase();
            $window.location.href = path;
        }
    }]);
