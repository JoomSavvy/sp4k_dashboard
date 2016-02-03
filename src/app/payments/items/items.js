/**
 *
 */

angular.module( 'sp4k.payments.items', [])

    .config(function config( $stateProvider ) {})

    .controller( 'PaymentsCtrl', function PaymentsController(
        $scope, $stateParams, $filter, $mdSidenav, $timeout,
        paymentsData, paymentsRestService
    ) {
        this.items = paymentsData.items;
        this.total_items = paymentsData.count;

        this.pageSize = 20;
        this.currentPage = 1;
        this.filters = { state: '1' };
        this.count = 0;

        this.columnOrder = {created:'asc'};
        this.columnSortState = {created:'arrow_drop_down'};
        this.filters = angular.merge(this.filters || {},{order:this.columnOrder});

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

        this.changeOrder = function(column){
            if(typeof this.columnOrder[column] == 'undefined' ){
                this.columnOrder[column] = 'asc';
                this.columnSortState[column] = 'arrow_drop_up';
            }else if(this.columnOrder[column]=='asc'){
                this.columnOrder[column] ='desc';
                this.columnSortState[column] = 'arrow_drop_down';
            }else{
                delete this.columnOrder[column];
                this.columnSortState[column] = 'sort';
            }
            this.filters.order = this.columnOrder;
        };

        this.getPage = function(){

            var limit = {};

            limit.limit = this.pageSize;
            limit.offset = (this.currentPage-1) * this.pageSize;

            if(this.count){

                var result = paymentsRestService.get({
                    paging:true,
                    filters:this.filters,
                    limit:limit,
                    count:this.count
                })
                ;

            }else{

                var result = paymentsRestService.query({
                    paging:true,
                    filters:this.filters,
                    limit:limit,
                    count:this.count
                })
                ;

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

    })

    ;

