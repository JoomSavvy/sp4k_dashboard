/**
 * Created by Ironman on 9/3/2015.
 */

angular.module( 'resources.roster',['ngResource'] ).factory('rosterRestService', function ($resource) {
    return $resource('/',
        {
            id: '@id',
            format:'json',
            option:'com_sp4k',
            controller:'api.roster'
        },{update:{method:'PUT'}});
});