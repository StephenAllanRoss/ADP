(function(){
    angular.module('modUserList', ['svcCommunication']).controller('UserList', function($scope, $location, $mdDialog, CommunicationService, ApplicationSettingsService){
        //Declare variables
        $scope.title = ApplicationSettingsService.Company.company;
        $scope.userList = [];
        $scope.actions = {
            'VIEW' :    0,
            'CREATE' :  1,
            'EDIT' :    2,
            'DELETE' :  3
        };

        //Retrieve all users.
        $scope.RetrieveUsers = function(){
            CommunicationService.MakeAPICall(CommunicationService.FetchType.GET, "users/user/" + ApplicationSettingsService.Company._id)
                .then(function(data){
                    $scope.userList = data;
                })
                .catch(function(error){
                    alert('Error: ' + error.msg);
                });
        };

        //Handle different user actions on page.
        $scope.UserAction = function(action, user){
              switch(action){
                  case $scope.actions.VIEW:
                      $location.path('user-detail/' + JSON.stringify(user));
                      break;

                  case $scope.actions.CREATE:
                      $location.path('user-edit/' + JSON.stringify({}));
                      break;

                  case $scope.actions.EDIT:
                      $location.path('user-edit/' + JSON.stringify(user));
                      break;

                  case $scope.actions.DELETE:
                      var confirm = $mdDialog.confirm()
                          .title('Are you sure that you\'d like to delete this user?')
                          .ok('Yes')
                          .cancel('Cancel');
                      $mdDialog.show(confirm).then(function() {
                          CommunicationService.MakeAPICall(CommunicationService.FetchType.DELETE, "users/user/" + user._id)
                              .then(function(data){
                                  $scope.RetrieveUsers();
                              })
                              .catch(function(error){
                                  alert('Error: ' + error.msg);
                              });
                      }, function() {
                          //User declined to delete employee
                      });
                      break;

                  default:
                      break;
              }
        };

        $scope.RetrieveUsers();
    })
})();