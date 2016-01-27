/**
 * Created by Ironman on 9/3/2015.
 */

angular.module( 'resources.parents',['ngResource'] ).factory('parentsRestService', function ($resource) {
    return $resource('/',
        {
            id: '@id',
            format:'json',
            option:'com_sp4k',
            controller:'api.parents'
        },{update:{method:'PUT'}});
});