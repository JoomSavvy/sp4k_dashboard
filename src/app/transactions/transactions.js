/**
 * Created by Ironman on 11/21/2015.
 */

angular.module( 'sp4k.transactions', [
    'sp4k.transactions.item',
    'sp4k.transactions.items',
    'resources.transactions',
    'ui.router'
])
    .config(function config($stateProvider){
        $stateProvider.state('transactions',{
            abstract:true
        });

        $stateProvider.state( 'transactions.items', {
            url: '/transactions/items',
            views: {
                "main@": {
                    controller: 'TransactionsItemsCtrl as Ctrl',
                    templateUrl: 'transactions/items/transactions.tpl.html'
                }
            },
            data:{ pageTitle: 'Transactions' },
            resolve: {
                transactionsRestService: 'transactionsRestService',
                transactionsData: function( $stateParams, transactionsRestService ){

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

                    var transactions = transactionsRestService.get( { filters:filters, limit:limit, paging:paging, count:count } );

                    return transactions.$promise;
                }
            }
        });

        $stateProvider.state( 'transactions.item', {
            url: '/transactions/item/{id}',
            views: {
                "main@": {
                    controller: 'TransactionsItemCtrl as Ctrl',
                    templateUrl: 'transactions/item/transaction.tpl.html'
                }
            },
            data:{ pageTitle: 'Transaction Detail' },
            resolve:{
                transactionsRestService: 'transactionsRestService',
                transaction: function( $stateParams, transactionsRestService ){

                    // Set up our resource calls
                    var transaction;

                    if(typeof $stateParams.id !== 'undefined' ){
                        transaction = transactionsRestService.get({id:$stateParams.id});
                    }else{
                        transaction = transactionsRestService.get();
                    }

                    // Wait until all resources have resolved their promises, then return this promise
                    return transaction.$promise;
                }
            }
        });
    })
;
