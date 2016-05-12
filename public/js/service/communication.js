(function(){
    angular.module('svcCommunication', []).factory('CommunicationService', function($q, $http){
        return {
            FetchType: {
                "GET"   : "GET",
                "POST"  : "POST",
                "PUT"   : "PUT",
                "DELETE": "DELETE"
            },
            //Local Endpoint
            baseURL: "http://localhost:3000/",

            MakeAPICall: function(fetchType, endpoint, body){
                var deferred = $q.defer();

                var req = {
                    method: fetchType,
                    url: this.baseURL+endpoint,
                    data: body
                };

                $http(req)
                    .success(function(data){
                        deferred.resolve(data);
                    })
                    .error(function(data){
                        deferred.reject(data);
                    });

                return deferred.promise;
            }
        };
    })
})();