/**
 *
 */

angular.module( 'sp4k.home', [
  'ui.router'
])

    .config(function config( $stateProvider ) {
      $stateProvider.state( 'home', {
        url: '/home',
        views: {
          "main": {
            controller: 'HomeCtrl',
            templateUrl: 'home/home.tpl.html'
          }
        },
        data:{ pageTitle: 'Home' }
      });
    })

    /**
     * And of course we define a controller for our route.
     */
    .controller( 'HomeCtrl', function HomeController( $scope ) {
    })

    ;

