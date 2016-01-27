/**
 *
 */

angular.module( 'sp4k.coaches.item', [])
    
    .config(function config( $stateProvider ) {

    })
    
    /**
     * And of course we define a controller for our route.
     */
    .controller( 'CoachesItemCtrl', function CoachesItemController( $scope,$filter,coach, coachesRestService ) {
        this.item = coach;

        this.cityOptions = [
            {
                text: 'Egham',
                value: 'Egham'
            },
            {
                text: 'Teddington',
                value: 'Teddington'
            },
            {
                text: 'Virginia Water',
                value: 'Virginia Water'
            },
            {
                text: 'Windsor',
                value: 'Windsor'
            },
            {
                text: 'Guildford',
                value: 'Guildford'
            },
            {
                text: 'Bracknell',
                value: 'Bracknell'
            },
            {
                text: 'Sunningdale',
                value: 'Sunningdale'
            },
            {
                text: 'Langley',
                value: 'Langley'
            },
            {
                text: 'Feltham',
                value: 'Feltham'
            },
            {
                text: 'Walton',
                value: 'Walton'
            },
            {
                text: 'Chertsey',
                value: 'Chertsey'
            },
            {
                text: 'Camberley',
                value: 'Camberley'
            },
            {
                text: 'Mitcham',
                value: 'Mitcham'
            },
            {
                text: 'Farnborough',
                value: 'Farnborough'
            },
            {
                text: 'Fleet',
                value: 'Fleet'
            },
            {
                text: 'Woking',
                value: 'Woking'
            },
            {
                text: 'Sandhurst',
                value: 'Sandhurst'
            },
            {
                text: 'Sunbury',
                value: 'Sunbury'
            },
            {
                text: 'Ashford',
                value: 'Ashford'
            },
            {
                text: 'Chessington',
                value: 'Chessington'
            },
            {
                text: 'Slough',
                value: 'Slough'
            },
            {
                text: 'Farnboorugh',
                value: 'Farnboorugh'
            },
            {
                text: 'Lightwater',
                value: 'Lightwater'
            }
        ];

        this.roleOptions = [

            {
                text:'Lead',
                value:'Lead'
            },
            {
                text:'Support',
                value: 'Support'
            },
            {
                text: 'Trainee',
                value: 'Trainee'
            }
        ];

        this.titleOptions = [
            {
                text:'Mr',
                value: 'Mr'
            },
            {
                text:'Mrs',
                value: 'Mrs'
            },
            {
                text:'Ms',
                value: 'Ms'
            },
            {
                text:'Miss',
                value: 'Miss'
            }
        ];

        this.stateOptions = [
            {
                text: 'Yes',
                value: 0
            },
            {
                text: 'No',
                value: '1'
            }
        ];

        this.showTitle = function(){
            var selected = $filter('filter')(this.titleOptions,{value:this.item.title});
            return selected.length ? selected[0].text : null;
        };

        this.showState = function(){
            var selected = $filter('filter')(this.stateOptions,{value:this.item.state});
            return selected.length ? selected[0].text : null;
        };

        this.showRole = function(){
            var selected = $filter('filter')(this.roleOptions,{value:this.item.role});
            return selected.length ? selected[0].text : null;
        }

    })
    //.filter('yesno',function(){
    //    return function(value){
    //        return value === '1' ? 'test' : 'No'
    //    };
    //})
    
    ;
    
