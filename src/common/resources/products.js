/**
 * Created by Ironman on 9/3/2015.
 */


angular.module( 'resources.products',['ngResource'] ).factory('productsRestService', function ($resource) {
    return $resource('/',
        {
            id: '@id',
            format:'json',
            option:'com_sp4k',
            controller:'api.products'
        },{
            update:{method:'PUT'}
        });
});