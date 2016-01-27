/**
 *
 */

angular.module( 'sp4k.children.item', [])

    .config(function($mdThemingProvider) {})
    .controller( 'ParentsItemCtrl', function ParentsItemController(
        $scope, $state, $stateParams,RouterTracker, $log, $filter, child, childrenRestService
    ) {
        this.item = child;
        this.item.account_id = this.item.account_id || $stateParams.account || null;


        this.saveItem = function(){
            var item = childrenRestService.save(this.item);
            item.$promise.then(angular.bind(this,function(){
                this.item = item;
            }));
        };

        this.cancelItem = function(){
            var router = RouterTracker.popRouteHistory();
            $state.go(router.route.name,router.routeParams);
        };

        $scope.$watch(
            angular.bind(this,
                function (state) {
                    return this.item.state;
                }
            ),
            angular.bind(this ,
                function(newVal) {
                    console.log(this.item.state);
                }
            )
        );
    })


;
    
