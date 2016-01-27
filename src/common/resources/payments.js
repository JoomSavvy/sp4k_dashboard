/**
 * Created by Ironman on 9/3/2015.
 */

angular.module( 'resources.payments',['ngResource'] ).factory('paymentsRestService', function ($resource) {
    return $resource('/',
        {
            id: '@id',
            format:'json',
            option:'com_sp4k',
            controller:'api.payments'
        },{update:{method:'PUT'}});
});