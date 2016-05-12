(function(){
    angular.module('modCompanyBanner', [])
        .controller('CompanyBanner', function($scope, $location, ApplicationSettingsService) {
            //Declare variables
            $scope.title = ApplicationSettingsService.Company.company;

            $scope.LogOut = function(){
                $location.path('login');
            }
        })
        .directive('companyBanner', function() {
            return {
                templateUrl: './template/header.html',
                controller: 'CompanyBanner'
            };
        });
})();