/**
 *
 */

angular.module( 'sp4k.parents', [
    'angularUtils.directives.dirPagination',
    'sp4k.parents.items',
    'sp4k.parents.item',
    'resources.children',
    'resources.parents',
    'ui.router'
])

    .config(function config( $stateProvider ) {

        $stateProvider.state( 'parents', {
            abstract:true
        });

        $stateProvider.state( 'parents.items', {
            url: '/parents/items',
            views: {
              "main@": {
                controller: 'ParentsItemsCtrl as Ctrl',
                templateUrl: 'parents/items/items.tpl.html'
              }
            },
            data:{ pageTitle: 'Parents' },
            resolve: {
                parentsRestService: 'parentsRestService',
                parentsData: function($stateParams, parentsRestService){
                    var filters = {};
                    filters.state = 1;

                    var limit = {};
                    limit.limit = 20;
                    limit.offset = 0;
                    var count = 1;
                    var paging = true;

                    if($stateParams.filters){
                        filters = $stateParams.filters;
                    }

                    var parents = parentsRestService.get( { filters:filters, limit:limit, paging:paging, count:count } );
                    return parents.$promise;
                }

            }
        });

        $stateProvider.state( 'parents.item', {
            url: '/parents/item/{id}',
            params: {
                account: null
            },
            views: {
                "main@": {
                    controller: 'ParentsItemCtrl as Ctrl',
                    templateUrl: 'parents/item/item.tpl.html'
                }
            },
            data:{ pageTitle: 'Parent Detail' },
            resolve:{
                parentsRestService:'parentsRestService',
                parent: function( $stateParams, parentsRestService ){


                    if(typeof $stateParams.id !== 'undefined' ){
                        parent = parentsRestService.get({id:$stateParams.id});
                    }else{
                        parent = parentsRestService.get();
                    }

                    return parent.$promise;
                },

                childrenRestService:'childrenRestService',
                children: function (childrenRestService, parent){
                    if(parent.id){
                        var children = {};

                        var filters = {
                            account_id: parent.account_id
                        };

                        children = childrenRestService.query({filters:filters});

                        return children.$promise;
                    }else{
                        return [];
                    }

                }
            }

        });

    });

