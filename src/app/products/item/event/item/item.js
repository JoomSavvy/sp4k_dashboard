/**
 *
 */

angular.module( 'sp4k.products.item.event', [
    'resources.venues',
    'resources.events',
    'resources.products',
    'resources.categories',
    'ui.router'
])
    
    .config(function config( $stateProvider ) {
        $stateProvider.state( 'products.item.event', {
            url: '/event/{event_id}',
            views: {
                "main@": {
                    controller: 'ProductsItemEventCtrl',
                    templateUrl: 'products/item/event/item/item.tpl.html'
                }
            },
            data:{ pageTitle: 'Product Event Detail' }
        });
    })
    
    /**
     * And of course we define a controller for our route.
     */
    .controller( 'ProductsItemEventCtrl', function ProductsItemEventController(
        $scope, $stateParams, $filter, eventsRestService, venuesRestService
    ){
        console.log($stateParams.product_id);
        console.log($stateParams.id);
        this.item = {};
        this.item.product_id = $stateParams.id;

        if(typeof $stateParams.id !== 'undefined' ){
            this.item = eventsRestService.get({id:$stateParams.id});
        }else{
            this.item = eventsRestService.get();
        }

        this.venueOptions = venuesRestService.query();

        this.showVenue = function(){
            var selected = $filter('filter')(this.venueOptions, {id: this.item.venue_id});
            return selected.length ? selected[0].title : null;
        };

        this.saveItem = function(){
            console.log(this.item);
            eventsRestService.save(this.item);
        };

        $scope.$watch(
            angular.bind(this,
                function (parent_id) {
                    return this.item.category_id;
                }
            ),
            angular.bind(this ,
                function(newVal, oldVal) {
                    if (newVal !== oldVal) {
                        console.log(this.item);
                    }
                }
            )
        );
    })
    
    ;
    
