angular.module('getSecurity', [])
    .controller('loginController', ['$scope', '$rootScope', '$http', '$window', '$timeout', 'SecretQuestion', function($scope, $rootScope, $http, $window, $timeout, SecretQuestion) {
        $scope.$watch('rollno', function() {
            if ($scope.rollno != "")
                fetchSecurity();
        });

        $scope.rollno = "";
        $scope.pass = "";
        $scope.securityQuestion = "";
        $scope.securityAnswer = "";
        $scope.ttsuccess = "";

        $scope.makeTT = function() {
            console.log("Initiating timetable create");
            SecretQuestion.makeTimeTable($scope.rollno.toLowerCase(), $scope.pass, $scope.securityAnswer, $rootScope.sessionToken)
                .then(function(data) {
                    console.log(data);
                    $scope.ttsuccess = "TimeTable successfully created"
                });
        }

        $scope.downloadTT = function() {
            console.log("Initiating timetable download");
            path = "/api/downloadICS/" + $scope.rollno.toLowerCase();
            $window.location.href = path;
            $scope.rollno = "";
            $scope.pass = "";
            $scope.securityQuestion = "";
            $scope.securityAnswer = "";
            $scope.ttsuccess = "";
        }

        function fetchSecurity() {
            console.log("Initiating fetch for Security question for " + $scope.rollno.toLowerCase());
            SecretQuestion.getSecret($scope.rollno.toLowerCase())
                .then(function(data) {
                    console.log(data);
                    var outputObj = JSON.parse(JSON.stringify(data));
                    console.log(outputObj.data);
                    $scope.securityQuestion = outputObj.data.secret_question;
                    $rootScope.sessionToken = outputObj.data.sessionToken;
                });
        }

        $scope.select = function() {
            this.setSelectionRange(0, this.value.length);
        }
    }]);
