/**
 *
 */

angular.module( 'sp4k.payments.item', [
  'ui.router'
])
    
    .config(function config( $stateProvider ) {
      $stateProvider.state( 'paymnts.item', {
        url: '/item/{id}',
        views: {
          "main@": {
            controller: 'PaymentsItemCtrl',
            templateUrl: 'payments/item/item.tpl.html'
          }
        },
        data:{ pageTitle: 'Payment Detail' }
      });
    })
    
    /**
     * And of course we define a controller for our route.
     */
    .controller( 'PaymentsItemCtrl', function PaymentsItemController( $scope ) {
    })
    
    ;
    
