/**
 *
 */

angular.module( 'sp4k.orders', [
    'sp4k.orders.item',
    'sp4k.orders.items'
])

    .config(function config( $stateProvider ) {

        $stateProvider.state('orders',{
            abstract:true
        });

        $stateProvider.state( 'orders.items', {
            url: '/orders/items',
            views: {
                "main@": {
                    controller: 'OrdersItemsCtrl as Ctrl',
                    templateUrl: 'orders/items/items.tpl.html'
                }
            },
            data:{ pageTitle: 'Orders' },
            resolve: {
                ordersRestService: 'ordersRestService',
                ordersData: function(ordersRestService, $stateParams){

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

                    var orders = ordersRestService.get( { filters:filters, limit:limit, paging:paging, count:count } );

                    return orders.$promise;
                }
            }
        });

        $stateProvider.state( 'orders.item', {
            url: '/orders/item/{id}',
            params:{
                account_id: null
            },
            views: {
                "main@": {
                    controller: 'OrdersItemCtrl as Ctrl',
                    templateUrl: 'orders/item/item.tpl.html'
                }
            },
            data:{ pageTitle: 'Order Detail' },
            resolve:{
                ordersRestService: 'ordersRestService',
                order: function($stateParams,ordersRestService){

                    // Set up our resource calls
                    var order;

                    if(typeof $stateParams.id !== 'undefined' ){
                        order = ordersRestService.get({id:$stateParams.id});
                    }else{
                        order = ordersRestService.get();
                    }

                    // Wait until all resources have resolved their promises, then return this promise
                    return order.$promise;
                },
                productsRestService:'productsRestService',
                productsNested: function($stateParams,productsRestService){

                    var products;

                    products = productsRestService.query({plugins:true,nest:true});

                    return products.$promise;
                },
                productsFlat: function($stateParams,productsRestService){

                    var products;

                    products = productsRestService.query({plugins:true,plugins:true});

                    return products.$promise;
                },
                childrenRestService:'childrenRestService',
                children: function(order,$stateParams,childrenRestService){
                    console.log($stateParams);
                    if( order.id !== null ){
                        var account_id = order.account_id;
                    }else{
                        var account_id = $stateParams.account_id;
                    }
                    return childrenRestService.query({filters:{account_id:account_id}}).$promise;
                }
            }
        });
    })
;