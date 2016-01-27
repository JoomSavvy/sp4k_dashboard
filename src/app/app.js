angular.module( 'sp4k', [
    'templates-app',
    'templates-common',
    'sp4k.categories',
    'sp4k.orders',
    'sp4k.invoices',
    'sp4k.payments',
    'sp4k.transactions',
    'sp4k.venues',
    'sp4k.events',
    'sp4k.coaches',
    'sp4k.catalog',
    'sp4k.products',
    'sp4k.reports',
    'sp4k.subscriptions',
    'sp4k.registrations',
    'sp4k.users',
    'sp4k.parents',
    'sp4k.accounts',
    'sp4k.rollcall',
    'sp4k.home',
    'angularUtils.directives.dirPagination',
    'services.autocomplete.mobilenumber',
    'services.autocomplete.children',
    'services.autocomplete.parents',
    'resources.registrations',
    'resources.subscriptions',
    'resources.accounts',
    'resources.orders',
    'sp4k.filters',
    'angular-loading-bar',
    'ngAnimate',
    'rgkevin.datetimeRangePicker',
    'ngMaterial',
    'ui.bootstrap',
    'xeditable',
    'ngResource',
    'ui.router'
])

    .config( function myAppConfig ( $stateProvider, $urlRouterProvider, $mdThemingProvider ) {
            $mdThemingProvider.theme('default')
                .primaryPalette('blue-grey');

            $urlRouterProvider.otherwise( '/home' );
    })

    .run( function run (editableOptions,$rootScope, RouterTracker ) {
        editableOptions.theme = 'bs3';

    })

    .controller( 'AppCtrl', function AppCtrl ( $scope ) {
      $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
        if ( angular.isDefined( toState.data.pageTitle ) ) {
          $scope.pageTitle = toState.data.pageTitle + ' | S4k' ;
        }
      });
    })

    ;

