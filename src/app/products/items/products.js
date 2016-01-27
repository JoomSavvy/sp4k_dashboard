/**
 *
 */

angular.module( 'sp4k.products.items', [])

    .config(function config( $stateProvider ) {
    })

    .controller( 'ProductsItemsCtrl', function ProductsItemsController( $scope,$state, products ) {
        this.items = products;

        this.selectProduct = function(product){
            $state.go('products.item',{id:product.id})
        };

        var options = {
            dataJSON:this.items,
            backLabel:"Back",
            callback:this.selectProduct
        };

        jQuery('#test').menu(options);
    })

    ;

