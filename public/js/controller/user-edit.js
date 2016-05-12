(function(){
    angular.module('modUserEdit', ['svcCommunication']).controller('UserEdit', function($scope, $routeParams, $location, CommunicationService, ApplicationSettingsService){
        //Declare variables
        $scope.title = ApplicationSettingsService.Company.company;
        $scope.userToEdit = JSON.parse($routeParams.userObject);
        $scope.user = {
            name: $scope.userToEdit.name || '',
            email: $scope.userToEdit.email || '',
            phone: $scope.userToEdit.phone || '',
            address: $scope.userToEdit.address || '',
            company: ApplicationSettingsService.Company._id
        };

        //If the route has passed us a user object then we are editing the user, otherwise we need to create one.
        $scope.ModifyUser = function(){
            Object.keys($scope.userToEdit).length === 0 ? $scope.CreateUser() : $scope.EditUser();
        };

        //Edit the user
        $scope.EditUser = function(){
            CommunicationService.MakeAPICall(CommunicationService.FetchType.PUT, "users/user/" + $scope.userToEdit._id, $scope.user)
                .then(function(data){
                    $location.path('user-list');
                })
                .catch(function(error){
                    alert('Error: ' + error.msg);
                });
        };

        //Create a new user
        $scope.CreateUser = function(){
            CommunicationService.MakeAPICall(CommunicationService.FetchType.POST, "users/user", $scope.user)
                .then(function(data){
                    //alert success and navigate to user-list
                    $location.path('user-list');
                })
                .catch(function(error){
                    alert('Error: ' + error.msg);
                });
        };
    })
})();