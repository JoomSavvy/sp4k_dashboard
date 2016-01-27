/**
 * Created by Ironman on 11/21/2015.
 */

angular.module( 'sp4k.invoices', [
    'sp4k.invoices.item',
    'sp4k.invoices.items',
    'resources.invoices',
    'ui.router'
])
    .config(function config($stateProvider){
        $stateProvider.state('invoices',{
            abstract:true
        });

        $stateProvider.state( 'invoices.items', {
            url: '/invoices/items',
            views: {
                "main@": {
                    controller: 'InvoicesItemsCtrl as Ctrl',
                    templateUrl: 'invoices/items/invoices.tpl.html'
                }
            },
            data:{ pageTitle: 'Invoices' },
            resolve: {
                invoicesRestService: 'invoicesRestService',
                invoiceData: function( $stateParams, invoicesRestService ){

                    var filters = {};
                    filters.state = 1;

                    var limit = {};
                    limit.limit = 20;
                    limit.offset = 0;
                    var count = 1;
                    var paging = true;

                    if( $stateParams.filters ){
                        filters = $stateParams.filters;
                    }

                    var invoices = invoicesRestService.get( { filters:filters, limit:limit, paging:paging, count:count } );

                    return invoices.$promise;
                }
            }
        });

        $stateProvider.state( 'invoices.item', {
            url: '/invoices/item/{id}',
            views: {
                "main@": {
                    controller: 'InvoicesItemCtrl as Ctrl',
                    templateUrl: 'invoices/item/item.tpl.html'
                }
            },
            data:{ pageTitle: 'Invoice Detail' },
            resolve:{
                invoicesRestService: 'invoicesRestService',
                invoice: function( $stateParams, invoicesRestService ){

                    // Set up our resource calls
                    var invoice;

                    if(typeof $stateParams.id !== 'undefined' ){
                        invoice = invoicesRestService.get({id:$stateParams.id});
                    }else{
                        invoice = invoicesRestService.get();
                    }

                    // Wait until all resources have resolved their promises, then return this promise
                    return invoice.$promise;
                }
            }
        });
    })
;
