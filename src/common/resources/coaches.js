/**
 * Created by Ironman on 9/3/2015.
 */

angular.module( 'resources.coaches',['ngResource'] ).factory('coachesRestService', function ($resource) {
    return $resource('/',
        {
            id: '@id',
            format:'json',
            option:'com_sp4k',
            controller:'api.coaches'
        },
        {
            update:{
                method:'PUT'
            }
        }
        );
});