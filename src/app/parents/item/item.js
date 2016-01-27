/**
 *
 */

angular.module( 'sp4k.parents.item', [
    'ngMaterial',
    'ui.router'
])

    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('altTheme').primaryPalette('red')
    })
    .controller( 'ParentsItemCtrl', function ParentsItemController(
        $scope, $state, $stateParams,RouterTracker, $log, $filter, $mdToast, children, parent, parentsRestService
    ) {
        this.item = parent;
        this.item.email = this.item.juser.email;
        this.item.account_id = this.item.account_id || $stateParams.account || null;
        this.showChildren = true;
        this.item.children = children;

        console.log(children);

        this.addChildForm = false;
        this.cachedEditChild = false;

        this.showAddChildForm = function(){
            this.newChild = this.newChild || {};
            this.newChild.dob = this.newChild.dob || new Date(1984, 4, 15);
            this.addChildForm = true;
        };

        this.commitChildForm = function(){
            //push the form data into the list of children and reset.
            this.item.children = this.item.children || [];
            if(!this.cachedEditChild){
                this.item.children.push(this.newChild);
            }

            this.addChildForm = false;
            this.newChild = {};
            this.cachedEditChild = false;
        };

        this.cancelAddChildForm = function(){
             if(this.cachedEditChild){
                 this.item.children[this.cachedEditChild.index] = this.cachedEditChild.data;
             }
            this.addChildForm = false;
            this.cachedEditChild = false;
        };

        this.editChild = function(index){

            if(this.cachedEditChild){
                this.cancelAddChildForm();
            }

            this.cachedEditChild = {};
            this.newChild = this.cachedEditChild.data = this.item.children[index];
            this.cachedEditChild.index = index;
            //this.item.children.splice(index,1);
            this.showAddChildForm(index);
        };

        this.removeChild = function(index){

            this.item.children.splice(index,1);

        };


        this.saveItem = function(){
            var item = parentsRestService.save(this.item);
            item.$promise.then(angular.bind(this,function(){
                this.item = item;
            }));
        };

        this.cancelItem = function(){
            var router = RouterTracker.popRouteHistory();
            console.log(router);
            $state.go(router.route.name,router.routeParams);
        };

        //test if we are creating a new parent, if so warn that it will be attached to new account.
        $scope.$on('$stateChangeSuccess', angular.bind(this,function () {
            if(null == this.item.account_id){
                this.showWarningToast();
            }else{
                this.showChildren = false;
            }
        }));

        this.uibCalendarStatus  = {
            opened:false
        };

        this.open = function($event) {
            this.uibCalendarStatus.opened = true;
        };


        this.titleOptions = [
            {
                text:'Mr',
                value: 'Mr'
            },
            {
                text:'Mrs',
                value: 'Mrs'
            },
            {
                text:'Ms',
                value: 'Ms'
            },
            {
                text:'Miss',
                value: 'Miss'
            }
        ];

        this.showTitle = function(){
            var selected = $filter('filter')(this.titleOptions,{value:this.item.title});
            return selected.length ? selected[0].text : null;
        };


        $scope.$watch(
            angular.bind(this,
                function (enabled) {
                    return this.item;
                }
            ),
            angular.bind(this ,
                function(newVal) {
                    this.item = newVal ? newVal : 'empty';
                }
            )
        );

        $scope.$watch(
            angular.bind(this,
                function (state) {
                    return this.item.state;
                }
            ),
            angular.bind(this ,
                function(newVal) {
                    console.log(this.item.state);
                }
            )
        );
        this.showWarningToast = function() {
            var toast = $mdToast.simple()
                .content('Using this form will create a new account. ' +
                'To add a parent to an existing account, please use the account detail screen!')
                .action('OK')
                .highlightAction(true)
                .position('top right')
                .parent(document.querySelector('#parentItemContainer'))
                .theme('altTheme')
                .hideDelay(0);
            $mdToast.show(toast);
        };
    })
    .controller('ToastCtrl', function($scope, $mdToast) {
        this.closeToast = function() {
            $mdToast.hide();
        };
    })

    .filter('childname',function($filter){
        return function(value,children){
            $child = $filter('filter')(children,{id:value});
            return $child[0].name;
        };
    })
;
    
