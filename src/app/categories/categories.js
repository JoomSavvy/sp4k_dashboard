/**
 *
 */

angular.module( 'sp4k.categories', [
    'sp4k.categories.item',
    'resources.categories',
    'ui.router'
])
    
    .config(function config( $stateProvider ) {
      $stateProvider.state( 'categories', {
        url: '/categories',
        views: {
          "main@": {
            controller: 'CategoriesCtrl',
            templateUrl: 'categories/categories.tpl.html'
          }
        },
        data:{ pageTitle: 'Category List' }
      });
    })
    
    /**
     * And of course we define a controller for our route.
     */
    .controller( 'CategoriesCtrl', function CategoriesController( $scope ,categoryRestService) {
        this.items = categoryRestService.query();
    })
    
    ;
    
