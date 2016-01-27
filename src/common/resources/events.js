/**
 * Created by Ironman on 9/3/2015.
 */


angular.module( 'resources.events',['ngResource'] ).factory('eventsRestService', function ($resource) {
    return $resource('/',
        {
            id: '@id',
            format:'json',
            option:'com_sp4k',
            controller:'api.events'
        },
        {
            update: {method:'PUT'}
        }

    );
});