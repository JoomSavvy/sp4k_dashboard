/**
 * Created by Ironman on 9/3/2015.
 */

angular.module( 'resources.orders',['ngResource'] ).factory('ordersRestService', function ($resource) {
    return $resource('/',
        {
            id: '@id',
            limit: '@limit',
            filters: '@filters',
            format:'json',
            option:'com_sp4k',
            controller:'api.orders'
        },
        {
            update:{
                method:'PUT'
            }
        }
    );
});