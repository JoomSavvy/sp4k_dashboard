/**
 *
 */

angular.module( 'sp4k.products.item', [])
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
        if((typeof this.item.config.schedule.exdates == 'undefined') || (typeof this.item.config.schedule.exdates == null))
        {
            this.item.config.schedule.exdates = [];
        }else{

            for(var i= 0,len=this.item.config.schedule.exdates.length;i<len;i++){
                var newDate = (this.item.config.schedule.exdates[i] / .001);
                this.item.config.schedule.exdates[i] = newDate;
            }
        }
        console.log(this.item);

        //if( this.item.config.schedule.rrule.indexOf('EXDATE')){
        //    this.item.config.schedule.rrule = this.item.config.schedule.rrule.replace(/EXDATE=.*[Z; || Z"]/,'').replace(/;$/,'');
        //}

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
            //rrule
            //get this.item.config.schedule.exdates
            // get this.item.config.schedule.rrule rruleSet.exdates();

            //var rrule = new RRuleSet(RRule.fromString(this.item.config.schedule.rrule));

            //var rrule = new RRule(RRule.parseString(this.item.config.schedule.rrule))
            //var rruleSet = new RRuleSet(rrule);
///
            ///var rrule = new RRule(RRule.parseString(this.item.config.schedule.rrule))
            ///var rruleSet = new RRuleSet();
            ///rruleSet.rrule(rrule);
///
            ///rruleSet.exdates(this.item.config.schedule.exdates);
///
            ///this.item.config.schedule.rrule = rruleSet.toString();



            //var rruleSet = new RRuleSet(true);
//
            ////rruleSet.rrule(rrulestr(this.item.config.schedule.rrule));
//
            //var ruleString = this.item.config.schedule.rrule.replace('RRULE:','').replace('["','').replace('"]','');
//
            //this.getRRuleString = function(){
            //    return this.item.config.schedule.rrule.replace('RRULE:','').replace('["','').replace('"]','');
            //};
//
            //var rruleParsed =  RRule.parseString(ruleString);
//
            //if(typeof rruleParsed.wkst == 'undefined'){rruleParsed.wkst = RRule.MO;}
            //var rrule = new RRule( rruleParsed);
//
            //rruleSet.rrule(rrule);
//
            //if( this.item.config.schedule.rrule.indexOf('EXDATE')){
            //    this.item.config.schedule.rrule =
            //        this.item.config.schedule.rrule.replace(/EXDATE=.*[Z; || Z"]/,'').replace(/;$/,'');
            //}

            //var createDateAsUTC = function (date) {
            //    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
            //};
//
            //var convertDateToUTC = function (date) {
            //    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
            //};

            var rruleSet = new RRuleSet(true);

            rruleSet.rrule(new RRule(
                RRule.parseString(
                    this.item.config.schedule.rrule
                )
            ));

            //for(var i= 0,len = this.item.config.schedule.exdates.length;i < len; i++){
//
            //    var checkDate = this.item.config.schedule.exdates[i];
            //    var date = createDateAsUTC(new Date(checkDate));
            //    //todo, date formatting for rrule api requirement
            //    rruleSet.exdate(date);
            //}

            //for(var i= 0,len = this.item.config.schedule.exdates.length;i < len; i++){

                //var checkDate = this.item.config.schedule.exdates[i];
                //var date = new Date(checkDate);

                //todo, date formatting for rrule api        requirement
                //rruleSet.exdate(convertDateToUTC(date));
            //}



            var getRRuleString = function(string){
                return string.replace('RRULE:','').replace('["','').replace('"]','');//.replace('","EXDATE:',';EXDATE=')    ;
            };

            var rruleCache = this.item.config.schedule.rrule;

            this.item.config.schedule.rrule = getRRuleString(rruleSet.toString());

            TargetProduct = angular.copy(this.item);

            var createDateAsUTC = function (date) {
                return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
            };

            for(var i= 0,len=this.item.config.schedule.exdates.length;i<len;i++){
                var newDate = (TargetProduct.config.schedule.exdates[i] *  .001);
                TargetProduct.config.schedule.exdates[i] = newDate;
            }

            this.processDtRangeOut();
            console.log(this.item.state);
            this.item.state = ( (typeof this.item.state == 'undefined' ) || (this.item.state == null) ) ? 1 : this.item.state;



            var exdatesCache = this.item.config.schedule.exdates;

            var item = productsRestService.save(TargetProduct);



            //item.config.schedule.rrule = rruleCache;

            item.$promise.then(angular.bind(this,function(){
                if(typeof item.config == 'string' ){
                    item.config = JSON.parse(item.config)
                }

                item.config.schedule.exdates = this.item.config.schedule.exdates;
                this.item = item;
            }));





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

        $scope.$watch(
            angular.bind(this,
                function () {
                    return this.item.config.schedule.exdates;
                }
            ),
            angular.bind(this ,
                function(newVal,oldVal) {
                }
            )
        ,true);

        this.removeExdate = function(dateIndex){

            console.log(this.item.config.schedule.exdates);
            console.log(dateIndex);
            this.item.config.schedule.exdates.splice(dateIndex,1);
            console.log(this.item.config.schedule.exdates);


        };

        this.updateExdates = function(oldVenueId,newVenueId){
            var oldVenue = $filter('filter')(this.venueOptions,{id: oldVenueId})[0];
            var newVenue = $filter('filter')(this.venueOptions,{id: newVenueId})[0];

            var nonVenueExdates = _.difference(this.item.config.schedule.exdates,oldVenue.exdates);

            var newExdates = [];

            if(newVenue.exdates !== null){
                newExdates = newVenue.exdates;
            }

            var exdates = _.union(nonVenueExdates,newExdates);

            console.log(exdates);


            if(exdates.length == 1){this.activeExDate = exdates[0];}
            this.item.config.schedule.exdates.splice(0,this.item.config.schedule.exdates.length);
            angular.extend(this.item.config.schedule.exdates,exdates);
            console.log(this.item.config.schedule.exdates);
        };


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

            var title = venueName + " " + parentName;

            this.item.title = title;

            return title;
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
    
