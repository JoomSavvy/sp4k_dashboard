/**
 *
 */

angular.module( 'sp4k.accounts.item', [
    'resources.children',
    'ui.router'
])



    /**
     * And of course we define a controller for our route.
     */
    .controller( 'AccountsItemCtrl', function AccountsItemController(
        $scope, $stateParams,$filter, account, accountsRestService, childrenRestService, parentsRestService,
        registrationsRestService, subscriptionsRestService
    ) {
        this.item = account;

        //this.commitChildForm = function(){
        //    //push the form data into the list of children and reset.
//
        //};

        this.saveItem = function(){
            var item = accountsRestService.save(this.item);
            item.$promise.then(angular.bind(this, function(){
               this.item = item;
            }));
        };

        //$scope.$watch(
        //    angular.bind(this,
        //        function (enabled) {
        //            return this.item;
        //        }
        //    ),
        //    angular.bind(this ,
        //        function(newVal) {
        //            this.item = newVal ? newVal : 'empty';
        //        }
        //    )
        //);

        this.addChildForm = false;
        this.cachedEditChild = false;

        this.editChild = function(index){

            if(this.cachedEditChild){
                this.cancelAddChildForm();
            }

            this.cachedEditChild = {};
            this.newChild = this.cachedEditChild.data = angular.copy(this.item.children[index]);
            this.cachedEditChild.index = index;
            //this.item.children.splice(index,1);

            this.newChild.dob = new Date(parseInt(this.newChild.dob) * 1000) || new Date(2010, 4, 15);
            this.addChildForm = true;
        };

        this.showAddChildForm = function(){
            this.addChildForm = true;
        };

        this.commitChildForm = function(){
            //push the form data into the list of children and reset.
            this.item.children = this.item.children || [];

            this.newChild.account_id = this.item.id;
            this.newChild.dob = this.newChild.dob.getTime() /1000;


            //we aren't editing an existing child.
            if(!this.cachedEditChild){
                this.item.children.push(this.newChild);
            }else{
                this.item.children[this.cachedEditChild.index] = this.newChild;
            }


            childrenRestService.save(this.newChild);

            this.addChildForm = false;
            this.newChild = {};
            this.cachedEditChild = false;
        };

        this.cancelAddChildForm = function(){
            //if(this.cachedEditChild){
            //    this.item.children[this.cachedEditChild.index] = this.cachedEditChild.data;
            //}
            this.addChildForm = false;
            this.cachedEditChild = false;
        };


        this.removeChild = function(index){

            this.item.children.splice(index,1);
            //delete on server

        };

        this.uibCalendarStatus  = {
            opened:false
        };

        this.open = function($event) {
            this.uibCalendarStatus.opened = true;
        };

        this.selectedPrimaryParent = function(selected){
            var primaryParent,notPrimaryParents;
            if(arguments.length){
                primaryParent = $filter('filter')(this.item.parents,{id:selected})[0];
                primaryParent.primary = 1;

                parentsRestService.save(primaryParent);

                notPrimaryParents = $filter('filter')(this.item.parents,{id:!selected});
                angular.forEach(notPrimaryParents, function(value, key, notPrimaryParent ){
                    notPrimaryParent.primary = 0;
                    parentsRestSevice.save(notPrimaryParent);
                });

            }else{
                return this.getPrimaryParent();
            }
        };

        this.getPrimaryParent = function(){
            var selected = $filter('filter')(this.item.parents,{primary:1});
            return selected.length ? selected[0].id : null;
        };
    })
    .filter('childname',function($filter){
        return function(value,children){
            $child = $filter('filter')(children,{id:value});
            return $child[0].name;
        };
    })
    .filter('productname',function($filter){
        return function(value,orderitems,order_id){
            var order = $filter('filter')(orderitems,{id:order_id});
            var orderItem = $filter('filter')(order[0].items,{product:{id:value}});
            return orderItem[0].product.title;
        };
    })
    ;
    
