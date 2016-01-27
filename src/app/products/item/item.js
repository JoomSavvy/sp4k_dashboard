/**
 *
 */

angular.module( 'sp4k.products.item', [
    'ui.router'
])
    .config(function config( $stateProvider ) {
    })

    .controller( 'ProductsItemCtrl', function ProductsItemController(
        $scope, $stateParams, $filter, resources, productsRestService
    ){
        this.activeDate = null;
        this.selectedDates = [new Date().setHours(0, 0, 0, 0)];
        var config = {
            membersonly:false,
            booking:{enabled:false, agegroups:{},venue_id:null},
            pricing:{enabled:false},
            discounts:{enabled:false},
            payment:{enabled:false},
            schedule:{enabled:false, rrule:{}, exdates:[], dates:[]},

        };

        //this.item = angular.extend({},baseitem,resources[0],true);
        this.item = resources[0] || {};
        if(this.item.config == null){
            this.item.config = config;
        }
        console.log(this.item);

        //this.item.config.schedule.rrule = this.item.config.schedule.rrule || {};
        //this.item.config.schedule.exdates = this.item.config.schedule.exdates || [];
        //this.item.config.schedule.dates = this.item.config.schedule.dates || [];

        this.parentOptions = resources[1];
        this.categoryOptions = resources[2];
        this.venueOptions = resources[3];

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

        this.processDtRangeIn =function(){
            this.dateTimeRange.time.from    = parseInt(this.item.config.schedule.timestart);
            this.dateTimeRange.time.to      = parseInt(this.item.config.schedule.timeend);
            this.dateTimeRange.date.from    = parseInt(this.item.config.schedule.datestart)*1000;
            this.dateTimeRange.date.to      = parseInt(this.item.config.schedule.dateend)*1000;
        };

        if(typeof this.item.id !== 'undefined'){this.processDtRangeIn();}

        this.processDtRangeOut =function(){
            this.item.config.schedule.timestart = this.dateTimeRange.time.from;
            this.item.config.schedule.timeend   = this.dateTimeRange.time.to;
            this.item.config.schedule.datestart = Date.parse(this.dateTimeRange.date.from)/1000;
            this.item.config.schedule.dateend   = Date.parse(this.dateTimeRange.date.to)/1000;
        };

        this.saveItem = function(){
            this.processDtRangeOut();
            var item = productsRestService.save(this.item);
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



        this.pricingTypeOptions = [
            {
                value:'unitspercycle',
                text:'Booking Units Per Cycle'
            },
            {
                value:'selectedunits',
                text:'Booking Units Selected'
            },
            {
                value:'percycle',
                text:'Per Cycle'
            },
            {
                value:'flat',
                text:'Flat Price'
            }
        ];

        this.scheduleTypeOptions = [
            {
                value:'recurring',
                text:'Recurring'
            },
            {
                value:'datespan',
                text:'Date Span'
            },
            {
                value:'pickdates',
                text:'Select Dates'
            }
        ];

        this.ageGroupOptions = [
            {
                id:1,
                title:'S4K Toddlers',
                description:'18 months to 3 years'
            },
            {
                id:2,
                title:'S4K Strikers',
                description:'5 to 7 years'
            },
            {
                id:3,
                title:'S4K Kickers',
                description:'3 to 5 years'
            },
            {
                id:4,
                title:'S4K Explorers',
                description:'3 to 5 years'
            },
            {
                id:5,
                title:'S4K KS2 School Club',
                description:'9 to 11 years'
            },
            {
                id:7,
                title:'S4K Academy (Under 7 & 8s)',
                description:'6 to 8 years'
            },
            {
                id:8,
                title:'S4K KS1 School Club',
                description:'5 to 8 years'
            },
            {
                id:9,
                title:'S4K Academy (Under 9 and 10s)',
                description:'6 to 8 years'
            }
        ];


        this.bookingTypeOptions = [
            {
                value:'subscription',
                text:'Subscription'
            },
            {
                value:'multidate',
                text:'Multi-day'
            },
            {
                value:'pickdates',
                text:'Pick Dates'
            },
            {
                value:'oneoff',
                text:'One-Off'
            },
            {
                value:'oneday',
                text:'One Day'
            },
            {
                value:'customerdate',
                text:'Customer Date'
            }
        ];



        this.discountTypeOptions = [

        ]
        ;

        this.cartDisplayOptions = [
            {
                text:'Display Item',
                value:'item'
            },
            {
                text:'Display Children',
                value:'children'
            }
        ];


        this.buildProductName = function(){

            var parentName,venueName;

            if(this.item.parent_id){
                parentName= $filter('filter')(this.parentOptions,{id:this.item.parent_id})[0].title;
            }else{
                parentName = '';
            }

            if(this.item.venue_id){
                venueName = $filter('filter')(this.venueOptions,{id:this.item.venue_id})[0].title;
            }else{
                venueName = '';
            }

            return venueName + " " + parentName;
        };

        this.showCategory = function(){
            var selected = $filter('filter')(this.categoryOptions, {id: this.item.category_id});
            return selected.length ? selected[0].title : null;
        };

        this.deleteItem = function(){
            productsRestService.delete(this.item);
        };

        this.showParent = function(){
            var selected = $filter('filter')(this.parentOptions, {id: this.item.parent_id});
            return selected.length ? selected[0].title : null;
        };

        this.showPricingType = function(){
            var selected = $filter('filter')( this.pricingTypeOptions , { value: this.item.config.pricing.type } );
            return selected.length ? selected[0].text : null;
        };

        this.showBookingType = function(){
            var selected = $filter('filter')(this.bookingTypeOptions,{value:this.item.config.booking.type});
            return selected.length ? selected[0].text : null;
        };

        this.showScheduleType = function(){
            var selected = $filter('filter')(this.scheduleTypeOptions,{value:this.item.config.schedule.type});
            return selected.length ? selected[0].text : null;
        };

        this.showVenue = function(){
            var selected = $filter('filter')(this.venueOptions,{id: this.item.venue_id});
            return selected.length ? selected[0].title : null;
        };

        this.showAgeGroup = function(){
            var selected = $filter('filter')(this.ageGroupOptions,{id: this.item.config.booking.agegroups.selected});
            return selected.length ? selected[0].title : null;
        };
        this.showCartDisplayType = function(){
            this.item.config.display = this.item.config.display || {}
            var selected = $filter('filter')(this.cartDisplayOptions,{value: this.item.config.display});
            return selected.length ? selected[0].text : null;
        }
    })
    
    ;
    
