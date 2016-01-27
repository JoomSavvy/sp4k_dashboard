/**
 *
 */

angular.module( 'sp4k.subscriptions', ['sp4k.subscriptions.items','sp4k.subscriptions.item'])

    .config(function config( $stateProvider ) {

        $stateProvider.state('subscriptions',{
            absolute:true
        }),

        $stateProvider.state( 'subscriptions.items', {
            url: '/subscriptions/items',
            views: {
                "main@": {
                    controller: 'SubscriptionsItemsCtrl as Ctrl',
                    templateUrl: 'subscriptions/items/items.tpl.html'
                }
            },
            data: {pageTitle: 'subscriptions'},
            resolve: {
                subscriptionsRestService: 'subscriptionsRestService',
                subscriptionData: function (subscriptionsRestService, $stateParams) {

                    var filters = {};
                    filters.state = 1;
                    filters.status = 'new';

                    var limit = {};
                    limit.limit = 20;
                    limit.offset = 0;
                    var count = 1;
                    var paging = true;



                    if($stateParams.filters){
                        filters = $stateParams.filters;
                    }

                    var subscriptionData = subscriptionsRestService.get( {filters:filters,limit:limit, paging:paging,count:count});

                    return subscriptionData.$promise;
                }
            }
        });

        $stateProvider.state( 'subscriptions.item', {
            url: '/subscriptions/item/{id}',
            views: {
                "main@": {
                    controller: 'SubscriptionsItemCtrl as Ctrl',
                    templateUrl: 'subscriptions/item/item.tpl.html'
                }
            },
            data:{ pageTitle: 'Subscription Detail' },
            resolve:{
                subscriptionsRestService:'subscriptionsRestService',
                subscription: function($stateParams, subscriptionsRestService) { // Inject resources

                    // Set up our resource calls
                    var subscription;

                    if(typeof $stateParams.id !== 'undefined' ){
                        subscription = subscriptionsRestService.get({id:$stateParams.id});
                    }else{
                        subscription = subscriptionsRestService.get();
                    }

                    // Wait until all resources have resolved their promises, then return this promise
                    return subscription.$promise;
                }
            }
        });
    })
    ;

