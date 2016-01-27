/**
 * Created by Ironman on 8/23/2015.
 */


angular.module( 'services.user.auth',['services.user.session'] ).service('userAuthService', function($q) {

    function login(data) {
        console.log(data);
        var userId = data;
        var deferred = $q.defer();

        setTimeout(function() {
            console.log(userId);

            if (userId) {
                deferred.resolve(userId);
            } else {
                deferred.reject('crap');
            }
        }, 1000);

        return deferred.promise;
        //todo set the session for the user on success.
    }

    function get(){
        return this.data;
    }

    return {
        login: login
    };
});