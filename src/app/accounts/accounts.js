/**
 *
 */

angular.module( 'sp4k.accounts', [
    'angularUtils.directives.dirPagination',
    'sp4k.accounts.items',
    'sp4k.accounts.item',
    'resources.accounts',
    'ngMaterial',
    'ui.router'
])

    .config(function config( $stateProvider ) {

        $stateProvider.state( 'accounts', {
            abstract:true
        });

        $stateProvider.state( 'accounts.items', {
            url: '/accounts/items',
            views: {
                "main@": {
                    controller: 'AccountsItemsCtrl as Ctrl',
                    templateUrl: 'accounts/items/items.tpl.html'
                }
            },
            data:{ pageTitle: 'Accounts' },
            resolve: {
                accountsRestService: 'accountsRestService',
                accountsData: function(accountsRestService, $stateParams){

                    var filters = {};
                    filters.state = 1;

                    var limit = {};
                    limit.limit = 20;
                    limit.offset = 0;
                    var count = 1;
                    var paging = true;

                    if($stateParams.filters){
                        filters = $stateParams.filters;
                    }

                    var accounts = accountsRestService.get( { filters:filters, limit:limit, paging:paging, count:count } );

                    return accounts.$promise;
                }
            }
        });

        $stateProvider.state( 'accounts.item', {
            url: '/accounts/item/{id}',
            views: {
                "main@": {
                    controller: 'AccountsItemCtrl as Ctrl',
                    templateUrl: 'accounts/item/item.tpl.html'
                }
            },
            data:{ pageTitle: 'Account Detail' },
            resolve:{
                accountsRestService: 'accountsRestService',
                account: function($stateParams,accountsRestService){

                    // Set up our resource calls
                    var account;

                    if(typeof $stateParams.id !== 'undefined' ){
                        account = accountsRestService.get({id:$stateParams.id});
                    }else{
                        account  = accountsRestService.get();
                    }

                    // Wait until all resources have resolved their promises, then return this promise
                    return account.$promise;
                }

            }
        });
    });
