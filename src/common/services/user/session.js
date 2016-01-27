/**
 * Created by Ironman on 8/23/2015.
 */


angular.module( 'services.user.session',[] ).service('userSessionService', function() {
    var users =  {
        '1':{
            "id": 1 ,
            "type": 1 ,
            "name": "Test Registered User"
        },
        '2':{
            "id": 2 ,
            "type":2,
            "name": "Johnny Carson"
        },
        '3':{
            "id": 3 ,
            "type":3,
            "host": "Joseph Cardwell"
        }
    }
    ;

    var user = {};

    var isLoggedIn = false;


    function set(id) {
        console.log('session user set');
        user = users[id];
        isLoggedIn = true;
    }

    function get() {
        return user;
    }


    return {
        set: set,
        get: get,
        isLoggedIn: function(){return isLoggedIn;}
    };
});