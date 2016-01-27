/**
 * Created by Ironman on 9/3/2015.
 */

angular.module( 'resources.transactions',['ngResource'] ).factory('transactionsRestService', function ($resource) {
    return $resource('/',
        {
            id: '@id',
            format:'json',
            option:'com_sp4k',
            controller:'api.transactions'
        },{update:{method:'PUT'}});
});