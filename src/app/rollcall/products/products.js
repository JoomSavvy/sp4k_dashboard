/**
 *
 */

angular.module( 'sp4k.rollcall.products', [])

    .config(function config( $stateProvider ) {
    })

    .controller( 'RollcallProductsCtrl', function RollcallProductsController( $scope,$state, products ) {
        this.items = products;

        this.selectProduct = function(product){
            console.log('select product '+product.id);
            $state.go('rollcall.roster',{id:product.id})
        };

        var options = {
            dataJSON:this.items,
            backLabel:"Back",
            callback:this.selectProduct
        };

        jQuery('#test').menu(options);
    })

    ;

