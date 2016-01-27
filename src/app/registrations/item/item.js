/**
 *
 */

angular.module( 'sp4k.registrations.item', [])
    
    .config(function config( $stateProvider ) {

    })
    
    /**
     * And of course we define a controller for our route.
     */
    .controller( 'RegistrationsItemCtrl', function ProductsItemController(
        $scope, $stateParams, $filter, registration, registrationsRestService
    ){
        this.item = registration;
    })
    
    ;
    
