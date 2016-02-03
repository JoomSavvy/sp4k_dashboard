/**
 *
 */

angular.module( 'sp4k.children', [
    'sp4k.children.items',
    'sp4k.children.item'
])

    .config(function config( $stateProvider ) {

        $stateProvider.state( 'children', {
            abstract:true
        });

        $stateProvider.state( 'children.items', {
            url: '/children/items',
            views: {
              "main@": {
                controller: 'ChildrenItemsCtrl as Ctrl',
                templateUrl: 'children/items/items.tpl.html'
              }
            },
            data:{ pageTitle: 'Children' },
            resolve: {
                childrenRestService: 'childrenRestService',
                childrenData: function($stateParams, childrenRestService){
                    var filters = {};
                    filters.state = 1;

                    var limit = {};
                    limit.limit = 20;
                    limit.offset = 0;
                    var count = 1;
                    var paging = true;

                    filters = $stateParams.filters || {};

                    filters = angular.merge(filters,{order:{'created':'asc'}});

                    var children = childrenRestService.get( { filters:filters, limit:limit, paging:paging, count:count } );
                    return children.$promise;
                }

            }
        });

        $stateProvider.state( 'children.item', {
            url: '/children/item/{id}',
            params: {
                account: null
            },
            views: {
                "main@": {
                    controller: 'ChildrenItemCtrl as Ctrl',
                    templateUrl: 'children/item/item.tpl.html'
                }
            },
            data:{ pageTitle: 'Child Detail' },
            resolve:{

                childrenRestService:'childrenRestService',
                child: function (childrenRestService){

                    if(typeof $stateParams.id !== 'undefined' ){
                        child = childrenRestService.get({id:$stateParams.id});
                    }else{
                        child = childrenRestService.get();
                    }

                    return child.$promise;

                },

                parentsRestService:'parentsRestService',
                parents: function( $stateParams, parentsRestService,child ){

                    if(child.id){

                        var filters = {
                            account_id: child.account_id
                        };

                        var parents = parentsRestService.query({filters:filters});

                        return parents.$promise;

                    }else{
                        return [];
                    }
                }
            }
        });
    });

