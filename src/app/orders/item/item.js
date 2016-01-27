/**
 *
 */

angular.module( 'sp4k.orders.item', [])
    
    .config(function config( $stateProvider ) {

    })
    
    /**
     * And of course we define a controller for our route.
     */
    .controller( 'OrdersItemCtrl', function OrdersItemController(
        $scope,$state, $stateParams,$filter,children,productsNested,productsFlat, order,  ordersRestService
    ) {

        this.item = order;
        this.item.account_id = order.account_id || $stateParams.account_id;
        this.children = children;
        this.productsNested = productsNested;
        this.displayProductForm = false;
        this.displayProductSelector = false;

        this.newProduct = {
            product:false
        };

        //this.item.config = JSON.parse("'"+this.item.config+"'");


        this.showProductForm = function()
        {
            this.newProduct = {
                product:false
            };
            this.displayProductForm = true;
            this.displayProductSelector = true;
        };

        this.commitProductForm = function()
        {
            this.newProduct.child = $filter('filter')(this.children,{id:this.newProduct.child_id})[0];
            this.item.items = this.item.items || [];
            this.item.items.push(this.newProduct);
            this.displayProductForm = false;
        };

        this.cancelProductForm = function(){
            this.newProduct = {
                product:false
            };
            this.displayProductForm = false;
        };

        this.cancelOrderChanges = function(){
            $state.go('accounts.item',{id:this.item.account_id})
        };

        this.saveItem = function()
        {
            var item = ordersRestService.save(this.item);
            item.$promise.then(angular.bind(this,function(){
                this.item = item;
                console.log(this);
                console.log(item);
            }));

        };

        this.getChildName = function(child_id)
        {
            return  $filter('filter')(this.children,{id:child_id})[0].name;
        };

        $scope.$watch(
            angular.bind(this,
                function () {
                    return this.newProduct.product
                }
            ),
            angular.bind(this ,
                function(newVal,oldVal) {
                    if(newVal !== oldVal){
                        console.log(this.newProduct.product)
                    }
                }
            )
        );

        this.selectProduct = angular.bind(this,function(item)
        {

            this.newProduct.data = {};
            this.newProduct.product = $filter('filter')(productsFlat,{id:item.id})[0];
            console.log(this.newProduct.product);
            //this.newProduct.product.config = JSON.parse(item.config);
            this.newProduct.data.product_id = this.newProduct.product.id;
            this.newProduct.product_id = this.newProduct.product.id;
            this.closeProductSelector();
            $scope.$apply();
        });

        var options = {
            dataJSON: this.productsNested,
            backLabel: "Back",
            callback: this.selectProduct
        };

        this.activateProductSelector = function(){
            jQuery('#productSelector').menu(options);
        };

        this.closeProductSelector = function(){
            this.displayProductSelector = false;
            console.log(this);
        };

        this.test = function(){
            console.log(this);
        };
    })
;