/**
 *
 */

angular.module( 'sp4k.products', [
    'gm.datepickerMultiSelect',
    'rruleRecurringSelect',
    'sp4k.products.items',
    'sp4k.products.item',
    'resources.venues',
    'resources.categories',
    'resources.products',
    'ui.router'
])
    .config(function config( $stateProvider ) {

        $stateProvider.state('products', {
            abstract: true
        });

        $stateProvider.state( 'products.items', {
            url: '/products/items',
            views: {
                "main@": {
                    controller: 'ProductsItemsCtrl as Ctrl',
                    templateUrl: 'products/items/products.tpl.html'
                }
            },
                data:{ pageTitle: 'Products' },
                resolve: {
                    productsRestService: 'productsRestService',
                    products: function(productsRestService,$stateParams) {
                        var filters = {};

                        if($stateParams.filters){
                            filters = $stateParams.filters;
                            angular.extend(filters)
                        }
                        console.log(filters);
                        var products = productsRestService.query({filters:filters,nest:true});

                        return products.$promise;
                    }
                }
        });

        $stateProvider.state( 'products.item', {
            url: '/products/item/{id}',
            views: {
                "main@": {
                    controller: 'ProductsItemCtrl as Ctrl',
                    templateUrl: 'products/item/item.tpl.html'
                }
            },
            data:{ pageTitle: 'Product Detail' },
            resolve:{
                productsRestService:'productsRestService',
                categoryRestService:'categoryRestService',
                venuesRestService:'venuesRestService',
                resources: function($q,$stateParams, categoryRestService, productsRestService, venuesRestService) { // Inject resources

                    // Set up our resource calls
                    var product,productOptions,categoryOptions,venueOptions;

                    if(typeof $stateParams.id !== 'undefined' ){
                        product = productsRestService.get({id:$stateParams.id});
                    }else{
                        product = productsRestService.get();
                    }

                    categoryOptions = categoryRestService.query();
                    productOptions  = productsRestService.query();
                    venueOptions = venuesRestService.query();

                    // Wait until all resources have resolved their promises, then return this promise
                    return $q.all([ product.$promise, productOptions.$promise, categoryOptions.$promise,venueOptions.$promise ]);
                }
            }
        });
    });


