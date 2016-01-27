/**
 *
 */

angular.module( 'sp4k.categories.item', [
    'resources.categories',
    'ui.router'
])
    
    .config(function config( $stateProvider ) {
      $stateProvider.state( 'categories.item', {
            url: '/item/{id}',
            views: {
                "main@": {
                    controller: 'CategoriesItemCtrl',
                    templateUrl: 'categories/item/item.tpl.html'
                }
            },
            data:{ pageTitle: 'Category Item' }
      });
    })
    
    /**
     * And of course we define a controller for our route.
     */
    .controller( 'CategoriesItemCtrl', function CategoriesItemController( $scope , $filter, $stateParams, categoryRestService) {

        this.item = {};
        this.parentOptions = [];


        /*
        this.parentOptions = categoryRestService.query().$promise.then(
            angular.bind(this,
                function(parentOptions){
                    for(var i= 0, len = parentOptions.length; i<len; i++){
                        console.log(this.parentOptions);
                        console.log(parentOptions[i]['id']);
                        if(parentOptions[i]['parent_id'] !== '0' ){
                            //iterate through the options and push them into an object keyed on the option id.
                            this.parentOptions[parentOptions[i]['id']] =  parentOptions[i];
                        }
                    }
                    console.log(this.parentOptions);
                }
            )
        );
         */
        this.parentOptions = categoryRestService.query();

        if(typeof $stateParams.id !== 'undefined' ){
            this.item = categoryRestService.get({id:$stateParams.id});
        }else{
            this.item = categoryRestService.get();
        }

        /*
        this.loadParentOptions = function() {
            return this.parentOptions.length ? null : categoryRestService.query()
                .$promise.then(angular.bind(this,
                    function(data) {
                        console.log(data);
                        this.parentOptions = data;
                    }
                ));
        };
        */
        this.saveItem = function(){
            console.log(this.item);
            categoryRestService.save(this.item);
        };

        this.showParent = function(){
            var selected = $filter('filter')(this.parentOptions, {id: this.item.parent_id});
            return selected.length ? selected[0].title : null;
        };


        $scope.$watch(
            angular.bind(this,
                function (parent_id) {
                    return this.item.parent_id;
                }
            ),
            angular.bind(this ,
                function(newVal, oldVal) {
                    if (newVal !== oldVal) {
                        console.log(this.item);
                    }
                }
            )
        );

    })
    
    ;
    
