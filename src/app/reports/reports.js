/**
 *
 */

angular.module( 'sp4k.reports', [
  'ui.router'
])

    .config(function config( $stateProvider ) {
      $stateProvider.state( 'reports', {
        url: '/reports',
        views: {
          "main": {
            controller: 'ReportsCtrl',
            templateUrl: 'reports/reports.tpl.html'
          }
        },
        data:{ pageTitle: 'Reports' }
      });
    })

    /**
     * And of course we define a controller for our route.
     */
    .controller( 'ReportsCtrl', function ReportsController( $scope ) {
    })

    ;

