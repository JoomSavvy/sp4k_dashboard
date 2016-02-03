/**
 * Created by Ironman on 12/18/2015.
 */

angular.module( 'sp4k.rollcall.roster', [])

    .config(function config( $stateProvider ) {
    })

    .controller( 'RollcallRosterCtrl', function RollcallRosterController( $scope, $state, roster, product, rosterRestService ) {
        console.log($state);
        this.product = product;
        this.items = roster;
        this.product_id = $state.params.id;
        this.date = new Date(new Date().toDateString());

        this.toggleAttendee = function(child_id,index){
            this.items[index].attending = !this.items[index].attending | 0;
            console.log(this.date.getTime());

            //date = new Date(this.date);
            rosterRestService.save({child_id:child_id,product_id:this.product_id,state:this.items[index].attending,date:this.date.getTime()})
        }

        this.changeDate = function(){
            date = new Date(this.date);
            rosterRestService.query({product:$state.params.id,date:date.getTime()})
                .$promise.then(angular.bind(this,function(test){
                    this.items = test;
                }));
        }
    })
;