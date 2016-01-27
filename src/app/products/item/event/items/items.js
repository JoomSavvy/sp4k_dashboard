/**
 *
 */

angular.module( 'sp4k.products.item.events', [
    'sp4k.products.item.event',
    'resources.events',
    'resources.products',
    'resources.categories',
    'ui.router'
])
    
    .config(function config( $stateProvider ) {
      $stateProvider.state( 'products.item.events', {
        url: '/events',
        views: {
          "main@": {
            controller: 'ProductsItemEventsCtrl',
            templateUrl: 'products/item/event/items/items.tpl.html'
          }
        },
        data:{ pageTitle: 'Product Event List' }
      });
    })
    
    /**
     * And of course we define a controller for our route.
     */
    .controller( 'ProductsItemEventsCtrl', function ProductsItemEventsController(
        $scope, $stateParams, $filter, eventsRestService
    ){

        this.items = eventsRestService.query({product_id:$stateParams.id});

    })
    
    ;
    
