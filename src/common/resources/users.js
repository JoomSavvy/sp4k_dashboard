/**
 * Created by Ironman on 9/3/2015.
 */

angular.module( 'resources.users',['ngResource'] ).factory('usersRestService', function ($resource) {
    return $resource('/',
        {
            id: '@id',
            format:'json',
            option:'com_sp4k',
            controller:'api.users'
        },{update:{method:'PUT'}});
});