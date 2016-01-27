/**
 *
 */

angular.module('sp4k.events', [
    'resources.venues',
    'resources.products',
    'resources.events',
    'sp4k.events.item',
    'ui.router'
])

    .config(function config($stateProvider  ) {
        $stateProvider.state('events', {
            url: '/events',
            views: {
                "main@": {
                    controller: 'EventsCtrl as Ctrl',
                    templateUrl: 'events/events.tpl.html'
                }
            },
            params: {
                productId: null,
                venueId: null,
            },
            data: {pageTitle: 'Events'},
            resolve: {
                eventsRestService: 'eventsRestService',
                venuesRestService: 'venuesRestService',
                productsRestService: 'productsRestService',
                events: function (eventsRestService,$stateParams,$cacheFactory) {
                    console.log($stateParams);
                    var filters;

                    if( $stateParams.productId != null ){
                        filters = filters || {};
                        filters.product_id = $stateParams.productId;
                    }


                    if( $stateParams.venueId != null ){

                        filters = filters || {};
                        filters.venue_id = $stateParams.venueId;
                    }

                    filters = {filter:filters} || null;
                    var events = eventsRestService.query(filters);

                    return events.$promise;
                },
                venues: function (venuesRestService) {
                    var venues = venuesRestService.query();
                    return venues.$promise;
                },
                products: function (productsRestService) {
                    var products = productsRestService.query();
                    return products.$promise;
                }
            }
        });
    })

    .controller('EventsCtrl', function EventsController($scope, $filter, $stateParams, events, venues, products) {

        this.productOptions = products;
        this.venueOptions = venues;

        this.showVenueOptions = function () {

        };

        this.showProductOptions = function () {

        };

        this.items = events;

        this.getEventProductTitle = function (product_id) {
            var selected = $filter('filter')(this.productOptions, {id: product_id});
            return selected[0].title;
        };

        this.getEventVenueTitle = function (venue_id) {
            var selected = $filter('filter')(this.venueOptions, {id: venue_id});
            return selected[0].title;
        };
    })
;
    
