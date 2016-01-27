/**
 *
 */

angular.module( 'sp4k.events.item', [
    'rruleRecurringSelect',
    'resources.venues',
    'resources.products',
    'resources.events',
    'ui.router'
])
    
    .config(function config( $stateProvider ) {
        $stateProvider.state( 'events.item', {
            url: '/item/{id}',
            views: {
                  "main@": {
                        controller: 'EventsItemCtrl',
                        templateUrl: 'events/item/item.tpl.html'
                  }
            },
            data:{ pageTitle: 'Category Item' }
        });
    })
    .run(function(){
        this.rule = {};
    })
    .controller( 'EventsItemCtrl', function EventsItemController(
        $scope, $stateParams, $filter, eventsRestService, venuesRestService, productsRestService
    ){
        this.rrule = this.rrule || {};
        this.processPickerIn =function(){
            this.dateTimeRange.time.from    = parseInt(this.item.timestart);
            this.dateTimeRange.time.to      = parseInt(this.item.timeend);
            this.dateTimeRange.date.from    = parseInt(this.item.datestart)*1000;
            this.dateTimeRange.date.to      = parseInt(this.item.dateend)*1000;
        }
        ;

        this.processPickerOut =function(){
            this.item.timestart = this.dateTimeRange.time.from;
            this.item.timeend   = this.dateTimeRange.time.to;
            this.item.datestart = Date.parse(this.dateTimeRange.date.from)/1000;
            this.item.dateend   = Date.parse(this.dateTimeRange.date.to)/1000;
        }
        ;

        this.item = {};
        if(typeof $stateParams.id !== 'undefined' ){
            eventsRestService.get({id:$stateParams.id}).$promise.then(
                angular.bind(this,
                    function(queryResult){
                        this.item = queryResult;
                        this.processPickerIn(queryResult);

                    }
                )
            );
        }else{
            this.item = eventsRestService.get();
        }

        this.saveItem = function(){
            console.log($scope);
            this.processPickerOut();
            console.log(this);

            //this.item.rrule = this.rrule || {};
            var result = eventsRestService.save(this.item,
                angular.bind(this ,
                    function(response){

                        this.item = response;
                    }
                )
            );
        };

        this.productOptions = productsRestService.query();
        this.venueOptions = venuesRestService.query();

        this.showProduct = function(){
            var selected = $filter('filter')(this.productOptions, {id: this.item.product_id});
            return selected.length ? selected[0].title : null;
        };

        this.showVenue = function(){
            var selected = $filter('filter')(this.venueOptions, {id: this.item.venue_id});
            return selected.length ? selected[0].title : null;
        };

        this.dateTimeRange = {
            date: {
                from: new Date(), // start date ( Date object )
                to: new Date() // end date ( Date object )
            },
            time: {
                from: 480, // default start time (in minutes)
                to: 1020, // default end time (in minutes)
                step: 15, // step width
                minRange: 15, // min range
                hours24: false // true = 00:00:00 | false = 00:00 am/pm
            }
        };

        this.dateTimeLabels = {
            date: {
                from: 'Start date',
                to: 'End date'
            }
        };

    })
;
    
