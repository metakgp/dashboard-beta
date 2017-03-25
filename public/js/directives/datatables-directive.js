angular.module('dtDirective', [])
    .directive('datatablesDirective', ['$timeout', function($timeout) {
        return {
            link: function($scope, element, attr) {
                $scope.$on('naaraddataloaded', function() {
                    $timeout(function() {
                        $.extend(true, $.fn.dataTable.defaults, {
                            "ordering": false,
                            "bInfo": false
                        });
                        $(document).ready(function() {
                            $('#feed').DataTable();
                        });
                    }, 1000, false);
                })
            }
        }
    }]);
