(function(){
    var adpApp = angular.module('adp', ['ngRoute', 'ngMaterial', 'modLogin', 'modUserList', 'modUserEdit', 'modCompanyBanner', 'svcCommunication', 'svcSettings']);
    adpApp.config(function($routeProvider){
        $routeProvider
            .when('/login',{
                templateUrl: 'template/login.html',
                controller: 'Login'
            })
            .when('/user-list',{
                templateUrl: 'template/user-list.html',
                controller: 'UserList'
            })
            .when('/user-edit/:userObject',{
                templateUrl: 'template/user-edit.html',
                controller: 'UserEdit'
            })
            .otherwise('/login',{
                templateUrl: 'template/login.html',
                controller: 'Login'
            })
    })
})();