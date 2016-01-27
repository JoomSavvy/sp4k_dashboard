/**
 *
 */

angular.module( 'sp4k.parents.items', [
    'resources.parents',
    'ui.router'
])

    .config(function config( $stateProvider ) {

    })

    /**
     * And of course we define a controller for our route.
     */
    .controller( 'ParentsItemsCtrl', function ParentsItemsController(
        $scope, $mdSidenav, $timeout, $log,  parentsData, parentsRestService, AutocompleteParents
    ) {
        console.log(AutocompleteParents.parent);
        this.items = parentsData.items;
        this.total_items = parentsData.count;

        this.pageSize = 20;
        this.currentPage = 1;
        this.filters = {
            state: '1'
        };
        this.count = 0;

        //this.filters.parent = AutocompleteParents().parent;

        $scope.$watch(function(){return AutocompleteParents.getParent()},
            angular.bind(this, function(newVal,oldVal){
                    this.filters.id = newVal.id;
            }),
            true
        );

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

        this.getPage = function(){

            var limit = {};

            limit.limit = this.pageSize;
            limit.offset = (this.currentPage-1) * this.pageSize;

            if(this.count){
                var result = parentsRestService.get( { paging:true, filters:this.filters, limit:limit, count:this.count} );
            }else{
                var result = parentsRestService.query( { paging:true, filters:this.filters, limit:limit, count:this.count}) ;
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
    //.controller('ParentSearchCtrl',function ParentSearchController( $scope, $log, parentsRestService ){
    //    this.parent = {};
    //    this.searchText = '';
    //    this.searchTextChange = function(text){
    //        this.searchText = text;
    //    };
    //    this.selectedItemChange = function(item)
    //    {
    //        $log.log(item);
    //    };
//
    //    this.querySearch = function(searchText){
    //        if(searchText.length > 3){
    //            console.log(searchText);
    //            var q = {};
    //            q.name = searchText;
    //            var limit = {};
    //            limit.offset = 0;
    //            limit.limit = 50;
    //            return parentsRestService.query({q:q,limit:limit}).$promise;
    //        }
    //    };
    //})
    //.filter('yesno',function(){
    //    return function(value){
    //        return value === '1' ? 'Yes' : 'No'
    //    };
    //})
    ;

