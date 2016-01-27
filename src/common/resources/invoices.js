/**
 * Created by Ironman on 9/3/2015.
 */


angular.module( 'resources.invoices',['ngResource'] ).factory('invoicesRestService', function ($resource) {
    return $resource('/',
        {
            id: '@id',
            format:'json',
            option:'com_sp4k',
            controller:'api.invoices'
        },{
            update:{method:'PUT'}
        });
});