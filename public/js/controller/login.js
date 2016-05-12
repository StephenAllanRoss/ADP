(function(){
    angular.module('modLogin', ['svcCommunication']).controller('Login', function($scope, $location, $mdDialog, CommunicationService, ApplicationSettingsService){
        //Declare Variables
        $scope.user = {
            company: '',
            password: ''
        };

        //If employer fails to log in, see if they would like to register a new account with the already provided credentials.
        $scope.Login = function(){
            if($scope.user.company != null && $scope.user.password != null){
                CommunicationService.MakeAPICall(CommunicationService.FetchType.GET, "employers/login/" + $scope.user.company + "/" + $scope.user.password)
                    .then(function(data){
                        ApplicationSettingsService.Company = data[0];
                        $location.path('user-list');
                    })
                    .catch(function(){
                        var confirm = $mdDialog.confirm()
                            .title('Your login failed, would you like to create an employer account by these credentials?')
                            .ok('Yes')
                            .cancel('Cancel');
                        $mdDialog.show(confirm).then(function() {
                            CommunicationService.MakeAPICall(CommunicationService.FetchType.POST, "employers/company", $scope.user)
                                .then(function (data) {
                                    ApplicationSettingsService.Company = data;
                                    $location.path('user-list');
                                })
                                .catch(function (error) {
                                    alert('Error: ' + error.msg);
                                });
                        });
                    });
            }else{
                alert('Both Username and Password fields are required.');
            }
        };
    })
})();