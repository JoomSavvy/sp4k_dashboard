/**
 *
 */

angular.module( 'sp4k.catalog', [
    'sp4k.catalog.item',
    'ui.router'
])

    .config(function config( $stateProvider ) {
      $stateProvider.state( 'catalog', {
        url: '/catalog',
        views: {
          "main": {
            controller: 'CatalogCtrl',
            templateUrl: 'catalog/catalog.tpl.html'
          }
        },
        data:{ pageTitle: 'Catalog' }
      });
    })
    
    /**
     * And of course we define a controller for our route.
     */
    .controller( 'CatalogCtrl', function CatalogController( $scope ) {
    })
    
    ;

