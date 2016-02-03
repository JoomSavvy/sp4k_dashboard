/**
 * 
 */

angular.module( 'sp4k.rollcall', [
    'sp4k.rollcall.roster',
    'sp4k.rollcall.products',
    'resources.products',
    'resources.roster',
    'ui.router'
])
    
    .config(function config( $stateProvider ) {
        $stateProvider.state('rollcall', {
            abstract: true
        });

        $stateProvider.state( 'rollcall.products', {
            url: '/rollcall/products',
            views: {
                "main@": {
                    controller: 'RollcallProductsCtrl as Ctrl',
                    templateUrl: 'rollcall/products/products.tpl.html'
                }
            },
            data:{ pageTitle: 'Select Product' },
            resolve: {
                productsRestService: 'productsRestService',
                products: function(productsRestService,$stateParams) {
                    var filters = {
                        //bookable:1
                    };

                    if($stateParams.filters){
                        filters = $stateParams.filters;
                        angular.extend(filters)
                    }

                    var products = productsRestService.query({filters:filters,nest:true});

                    return products.$promise;
                }
            }
        });

        $stateProvider.state( 'rollcall.roster', {
            url: '/rollcall/roster/{id}',
            views: {
                "main@": {
                    controller: 'RollcallRosterCtrl as Ctrl',
                    templateUrl: 'rollcall/roster/roster.tpl.html'
                }
            },
            data:{ pageTitle: 'Roster' },
            resolve: {
                rosterRestService: 'rosterRestService',
                roster: function(rosterRestService,$stateParams) {

                    var date = new Date(new Date().toDateString()).getTime();
                    var roster = rosterRestService.query({product:$stateParams.id || null,date:date});

                    return roster.$promise;
                },
                productsRestService: 'productsRestService',
                product: function(productsRestService,$stateParams){
                    var product = productsRestService.get({id:$stateParams.id});

                    return product.$promise;
                }
            }
        });
    })

    ;

