/**
 *
 */

angular.module( 'sp4k.coaches', [
    'sp4k.coaches.item',
    'sp4k.coaches.items',
    'resources.coaches',
    'ui.router'
])
    
    .config(function config( $stateProvider ) {

        $stateProvider.state('coaches', {
            abstract:true
        });

        $stateProvider.state( 'coaches.items', {
            url: '/coaches/items',
            views: {
                "main@": {
                    controller: 'CoachesItemsCtrl as Ctrl',
                    templateUrl: 'coaches/items/coaches.tpl.html'
                }
            },
            data:{ pageTitle: 'Coaches' },
            resolve: {
              coachesRestService: 'coachesRestService',
              coaches: function(coachesRestService,$stateParams) {
                  var filters = {};
                  filters.state = 1;

                  var limit = {};
                  limit.limit = 25;
                  limit.offset = 0;
                  var count = 1;
                  var paging = true;

                  if($stateParams.filters){
                      filters = $stateParams.filters;
                  }

                  var coaches = coachesRestService.get({filters:filters,limit:limit, paging:paging,count:count});

                  return coaches.$promise;
              }
            }
        });

        $stateProvider.state( 'coaches.item', {
            url: '/coaches/item/{id}',
            views: {
                "main@": {
                    controller: 'CoachesItemCtrl as Ctrl',
                    templateUrl: 'coaches/item/coach.tpl.html'
                }
            },
            data:{ pageTitle: 'Category Item' },
            resolve:{
                coachesRestService:'coachesRestService',
                coach: function($stateParams, coachesRestService) { // Inject resources

                    // Set up our resource calls
                    var coach;

                    if(typeof $stateParams.id !== 'undefined' ){
                        coach = coachesRestService.get({id:$stateParams.id});
                    }else{
                        coach = coachesRestService.get();
                    }

                    return coach.$promise;
                }
            }
        });
    })
    
    ;