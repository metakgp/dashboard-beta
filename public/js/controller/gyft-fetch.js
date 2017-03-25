angular.module('getTimeTable', [])
    .controller('timetableController', ['$scope', '$window', '$location', '$sce', 'TimeTables', function($scope, $window, $location, $sce, TimeTables) {
        var rollno = $location.search().user;
        if (!angular.isUndefined(rollno)) {
            if (rollno.length > 0) {
                TimeTables.getTTHtml(rollno)
                    .then(function(data) {
                        var ttfh = "'" + data.data + "'";
                        $scope.timetableFromHtml = $sce.trustAsHtml(ttfh);
                    });
            }

            $scope.downloadTT = function() {
                console.log("Initiating timetable download");
                path = "/api/downloadICS/" + rollno.toLowerCase();
                $window.location.href = path;
            }
        }
    }]);
