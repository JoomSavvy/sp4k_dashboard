/**
 *
 */

angular.module( 'sp4k.payments', [
    'sp4k.payments.items',
    'sp4k.payments.item'
])

    .config(function config( $stateProvider ) {

        $stateProvider.state('payments',{
            abstract:true
        });

        $stateProvider.state( 'payments.items', {
            url: '/payments/items',
            views: {
                "main@": {
                    controller: 'PaymentsCtrl as Ctrl',
                    templateUrl: 'payments/items/items.tpl.html'
                }
            },
            data:{ pageTitle: 'Payments' },
            resolve: {
                paymentsRestService: 'paymentsRestService',
                paymentsData: function($stateParams, paymentsRestService){

                    var limit = {};
                    limit.limit = 20;
                    limit.offset = 0;
                    var count = 1;
                    var paging = true;

                    var filters = $stateParams.filters || {};

                    filters = angular.merge(
                        filters,
                        {
                            order:
                            {
                                'created':'asc'
                            },
                            state:1
                        }
                    );

                    var payments = paymentsRestService.get({
                        filters:filters,
                        limit:limit,
                        paging:paging,
                        count:count
                    });

                    return payments.$promise;
                }
            }
        });

        $stateProvider.state( 'payments.item', {
            url: '/payments/item/{id}',
            views: {
                "main@": {
                    controller: 'PaymentsItemCtrl',
                    templateUrl: 'payments/item/item.tpl.html'
                }
            },
            data:{ pageTitle: 'Payment Detail' }
        });
    })
    ;

