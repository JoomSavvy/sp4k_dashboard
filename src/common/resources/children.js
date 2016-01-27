/**
 * Created by Ironman on 9/3/2015.
 */

angular.module( 'resources.children',['ngResource'] ).factory('childrenRestService', function ($resource) {
    return $resource('/',
        {
            id: '@id',
            format:'json',
            option:'com_sp4k',
            controller:'api.children'
        },{update:{method:'PUT'}});
});