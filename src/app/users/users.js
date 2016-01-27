/**
 *
 */

angular.module( 'sp4k.users', [
    'sp4k.users.item',
    'ui.router'
])

    .config(function config( $stateProvider ) {
        $stateProvider.state( 'users', {
            url: '/users',
            views: {
                "main": {
                    controller: 'UsersCtrl',
                    templateUrl: 'users/users.tpl.html'
                }
            },
            data:{ pageTitle: 'Users' }
        });
    })

    .controller( 'UsersCtrl', function UsersController( $scope ) {
    })

;

