angular.module('dashboard', ['ngRoute', 'getSecurity', 'getSecurityService', 'fetchNaarad', 'searchWiki', 'getTimeTable', 'getGyftService'])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            rewriteLinks: false
        });
    }]);
