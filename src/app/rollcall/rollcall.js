/**
 * 
 */

angular.module( 'sp4k.rollcall', [
  'ui.router'
])
    
    .config(function config( $stateProvider ) {
      $stateProvider.state( 'rollcall', {
        url: '/rollcall',
        views: {
          "main": {
            controller: 'RollcallCtrl',
            templateUrl: 'rollcall/rollcall.tpl.html'
          }
        },
        data:{ pageTitle: 'Rollcall' }
      });
    })
    
    .controller( 'RollcallCtrl', function RollcallController( $scope ) {
    })
    
    ;

