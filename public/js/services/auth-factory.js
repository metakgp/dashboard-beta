angular.module('getSecurityService', [])
    .factory('SecretQuestion', ['$http', function($http) {
        return {
            getSecret: function(user) {
                return $http.get('/api/getSecret/' + user);
            },
            makeTimeTable: function(user, pass, security, sid) {
                return $http.get('/api/makeTimeTable/' + user + '/' + pass + '/' + security + '/' + sid);
            },
            downloadTT: function(user) {
                return $http.get('/api/downloadICS/' + user);
            }
        }
    }])
