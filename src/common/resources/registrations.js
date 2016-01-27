/**
 * Created by Ironman on 9/3/2015.
 */

angular.module( 'resources.registrations',['ngResource'] ).factory('registrationsRestService', function ($resource) {
    return $resource('/',
        {
            id: '@id',
            limit: '@limit',
            filters: '@filters',
            format:'json',
            option:'com_sp4k',
            controller:'api.registrations'
        },
        {
            update:{
                method:'PUT'
            }
        }
    );
});