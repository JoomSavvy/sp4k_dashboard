/**
 *
 */

angular.module( 'sp4k.subscriptions.item', [])
    
    .config(function config( $stateProvider ) {})
    
    /**
     * And of course we define a controller for our route.
     */
    .controller( 'SubscriptionsItemCtrl', function SubscriptionsItemController(
        $scope, $stateParams, $filter, subscription, subscriptionsRestService
    ){

        this.item = subscription;

        this.saveItem = function(){
            var item = subscriptionsRestService.save(this.item);
            item.$promise.then(function(){
                if(typeof item.config == 'string' ){
                    item.config = JSON.parse(item.config)
                }

                this.item = item;
            });
        };

        $scope.$watch(
            angular.bind(this,
                function (enabled) {
                    return this.item.config.booking.enabled;
                }
            ),
            angular.bind(this ,
                function(newVal) {
                    this.item.bookable = newVal ? 1 : 0;
                }
            )
        );



    })
    
    ;
    
