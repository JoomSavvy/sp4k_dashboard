/**
 *
 */

angular.module( 'sp4k.orders.items', [])

    .config(function config( $stateProvider ) {

    })

    .controller( 'OrdersItemsCtrl', function OrdersItemsController(
        $scope, ordersData, ordersRestService, $mdSidenav, $timeout, $log,AutocompleteParents
    ) {
        this.items          = ordersData.items;
        this.total_items    = ordersData.count;
        this.newDate = new Date();
        this.pageSize = 20;
        this.currentPage = 1;
        this.filters = {
            state:'1',
            orderDate: {
                min: false,//angular.noop,
                max: false//angular.noop
            }
        };

        this.count = 0;

        this.orderDate = this.orderDate || {};

        this.orderDate.min = angular.bind(this,function(date){
            if(typeof date !== 'undefined'){
                this.filters.orderDate.min = date.getTime() / 1000;
            }else{
                if(this.filters.orderDate.min){
                    return new Date(this.filters.orderDate.min * 1000);
                }else{
                    return null;
                }
            }
        });

        this.orderDate.max = angular.bind(this,function(date){
            if(typeof date !== 'undefined'){
                this.filters.orderDate.max = date.getTime() / 1000;
            }else{
                if(this.filters.orderDate.max){
                     return new Date(this.filters.orderDate.max * 1000);
                }else{
                    return null;
                }
            }
        });

        $scope.$watch(
            angular.bind(this,
                function (currentPage) {
                    return this.currentPage;
                }
            ),
            angular.bind(this ,
                function(newVal,oldVal) {
                    if(newVal !== oldVal){
                        this.getPage(newVal);
                    }
                }
            )
        );

        $scope.$watch(
            angular.bind(this,
                function (filters) {
                    return this.filters;
                }
            ),
            angular.bind(this ,
                function(newVal,oldVal) {
                    if(newVal !== oldVal){

                        this.count = 1;//changing filters will change the number of results so get the count so that we can adjust the pagination
                        if(this.currentPage == 1)
                        {
                            //if its already one, just fire the getPage() function to get the new data
                            this.getPage();
                        }else{
                            //if we aren't on page 1, just change it and let the watcher fire the getPage() function.
                            this.currentPage = 1;
                        }
                    }
                }
            ),
            true//deep watch
        );

        $scope.$watch(function(){return AutocompleteParents.getParent()},
            angular.bind(this, function(newVal,oldVal){
                if(newVal != oldVal){
                    if(typeof newVal !== 'undefined'){
                        this.filters.parent_id = newVal.id;
                    }else{
                        delete( this.filters.parent_id );
                    }
                }
            }),
            true
        );

        this.getPage = function(){

            var limit = {};

            limit.limit = this.pageSize;
            limit.offset = (this.currentPage-1) * this.pageSize;

            if(this.count){
                var result = ordersRestService.get( { paging:true, filters:this.filters, limit:limit, count:this.count} );
            }else{
                var result = ordersRestService.query( { paging:true, filters:this.filters, limit:limit, count:this.count}) ;
            }

            result.$promise.then(
                angular.bind(this,
                    function(){
                        if(this.count){
                            this.total_items = result.count;
                            this.items = result.items;
                            this.count = 0;
                        }else{
                            this.items = result;
                        }

                        //turn it back off for the next query.
                    }
                )
            );
        };


        /*
         *  Toggle Left Slidout Filterbar.
         */
        this.toggleLeft = buildDelayedToggler('left');
        this.isOpenLeft = function(){
            return $mdSidenav('left').isOpen();
        };

        function debounce(func, wait, context) {
            var timer;
            return function debounced() {
                var context = $scope,
                    args = Array.prototype.slice.call(arguments);
                $timeout.cancel(timer);
                timer = $timeout(function() {
                    timer = undefined;
                    func.apply(context, args);
                }, wait || 10);
            };
        }

        /**
         * Build handler to open/close a SideNav; when animation finishes
         * report completion in console
         */
        function buildDelayedToggler(navID) {
            return debounce(function() {
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            }, 200);
        }
        function buildToggler(navID) {
            return function() {
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            }
        }

    })
    .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
        $scope.close = function () {
            $mdSidenav('left').close()
                .then(function () {
                    $log.debug("close LEFT is done");
                });
        };
    })
    .filter('yesno',function(){
        return function(value){
            return value === '1' ? 'Yes' : 'No'
        };
    })

;