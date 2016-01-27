/**
 * Created by Ironman on 9/3/2015.
 */



angular.module( 'resources.venues',['ngResource'] ).factory('venuesRestService', function ($resource) {
    return $resource('/',
        {
            id: '@id',
            format:'json',
            option:'com_sp4k',
            controller:'api.venues'
        },{update:{method:'PUT'}});
});