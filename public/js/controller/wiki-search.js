angular.module('searchWiki', [])
    .controller('wikiSearchController', ['$scope', '$http', '$window', '$timeout', function($scope, $http, $window, $timeout) {
        $scope.searchquery = "";
        $scope.triggerSearch = function() {
            var modifiedquery = $scope.searchquery.replace(/ /g, '+');
            console.log('Searching for ' + modifiedquery);
            $window.open('https://wiki.metakgp.org/index.php?search=' + modifiedquery + '&title=Special%3ASearch&go=Go', '_blank');
        }
    }]);
