/**
 *
 */

angular.module( 'sp4k.registrations', ['sp4k.registrations.items','sp4k.registrations.item'])

    .config(function config( $stateProvider ) {
        $stateProvider.state('registrations',{
           absolute:true
        }),
        $stateProvider.state( 'registrations.items', {
            url: '/registrations/items',
            views: {
                "main@": {
                    controller: 'RegistrationsItemsCtrl as Ctrl',
                    templateUrl: 'registrations/items/items.tpl.html'
                }
            },
            data: {pageTitle: 'Registrations'},
            resolve: {
                registrationsRestService: 'registrationsRestService',
                registrationData: function (registrationsRestService, $stateParams) {

                    var filters = {};
                    filters.state = 1;
                    filters.status = 'new';

                    var limit = {};
                    limit.limit = 20;
                    limit.offset = 0;
                    var count = 1;
                    var paging = true;

                    if($stateParams.filters){
                        filters = $stateParams.filters;
                    }

                    var registrationData = registrationsRestService.get( {filters:filters,limit:limit, paging:paging,count:count});

                    return registrationData.$promise;
                }
            }
        });

        $stateProvider.state( 'registrations.item', {
            url: '/registrations/item/{id}',
            views: {
                "main@": {
                    controller: 'RegistrationsItemCtrl as Ctrl',
                    templateUrl: 'registrations/item/item.tpl.html'
                }
            },
            data:{ pageTitle: 'Registration Detail' },
            resolve:{
                registrationsRestService:'registrationsRestService',
                registration: function($q,$stateParams, registrationsRestService ) { // Inject resources

                    var registration;

                    if(typeof $stateParams.id !== 'undefined' ){
                        registration = registrationsRestService.get({id:$stateParams.id});
                    }else{
                        registration = registrationsRestService.get();
                    }

                    return registration.$promise;
                }
            }
        });
    })
    ;

