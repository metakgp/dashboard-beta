angular.module('dashboard', ['ngRoute', 'getSecurity', 'getSecurityService', 'fetchNaarad', 'searchWiki', 'getTimeTable', 'getGyftService', 'sidebarCheck', 'dtDirective', 'cabShare', 'buySell', '720kb.datepicker'])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            rewriteLinks: false
        });
    }]);
