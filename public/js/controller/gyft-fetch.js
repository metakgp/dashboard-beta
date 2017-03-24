angular.module('getTimeTable', [])
    .controller('timetableController', ['$scope', '$location', '$templateRequest', '$sce', '$compile', 'TimeTables', function($scope, $location, $templateRequest, $sce, $compile, TimeTables) {
        var rollno = $location.search().user;
        var htmlTT = TimeTables.getTTHtml(rollno);
        console.log(htmlTT);
        // var templateUrl = $sce.getTrustedResourceUrl('nameOfTemplate.html');
        // $templateRequest(templateUrl).then(function(template) {
        //     $compile($("#my-element").html(template).contents())($scope);
        // }, function() {
        //     // An error has occurred
        // });
    }]);
