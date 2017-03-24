angular.module('getGyftService', [])
    .factory('TimeTables', ['$http', function($http) {
        return {
            getTTHtml: function(user) {
                return $http.get('/api/getTimetableHtml/' + user);
            }
        }
    }])
