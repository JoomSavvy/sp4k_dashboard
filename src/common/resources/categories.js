/**
 * Created by Ironman on 9/3/2015.
 */


angular.module( 'resources.categories',['ngResource']).factory('categoryRestService', function ($resource) {
    return $resource('/',
        {
            id: '@id',
            format:'json',
            option:'com_sp4k',
            controller:'api.categories'
        },{update:{method:'PUT'}});
});