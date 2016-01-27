/**
 *
 */

angular.module( 'sp4k.users.item', [
  'ui.router'
])
    
    .config(function config( $stateProvider ) {
      $stateProvider.state( 'users.item', {
        url: '/item/{id}',
        views: {
          "main@": {
            controller: 'UsersItemCtrl',
            templateUrl: 'users/item/item.tpl.html'
          }
        },
        data:{ pageTitle: 'Category Item' }
      });
    })
    
    /**
     * And of course we define a controller for our route.
     */
    .controller( 'UsersItemCtrl', function UsersItemController( $scope ) {
    })
    
    ;
    
