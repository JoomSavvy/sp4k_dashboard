/**
 *
 */

angular.module( 'sp4k.venues', [
    'sp4k.venues.item',
    'sp4k.venues.items',
    'resources.venues',
    'ui.router'
])


    .config(function config( $stateProvider ) {

        $stateProvider.state( 'venues', {
            abstract:true
        });

        $stateProvider.state( 'venues.items', {
            url: '/venues/items',
            views: {
                "main@": {
                    controller: 'VenuesItemsCtrl as Ctrl',
                    templateUrl: 'venues/items/venues.tpl.html'
                }
            },
            data:{ pageTitle: 'Venues' },
            resolve: {
                venuesRestService: 'venuesRestService',
                venues: function(venuesRestService,$stateParams) {
                    var filters = {};

                    if($stateParams.filters){
                        filters = $stateParams.filters;
                    }

                    var venues = venuesRestService.query(filters);

                    return venues.$promise;
                }
            }
        });
        $stateProvider.state( 'venues.item', {
            url: '/venues/item/{id}',
            views: {
                "main@": {
                    controller: 'VenuesItemCtrl as Ctrl',
                    templateUrl: 'venues/item/item.tpl.html'
                }
            },
            data:{ pageTitle: 'Venue Item' }
        });

    });

