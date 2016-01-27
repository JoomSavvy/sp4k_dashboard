/**
 * Created by Ironman on 8/29/2015.
 */


// loginModal.js
/*jshint laxbreak:true   */
angular.module('services.modal.select',[])
    .config(function(){
    })
    .run(function($rootScope,loginModal){

    })
    .service('loginModal', function ($modal, $rootScope) {

        function processSelect (params) {
            console.log(params);
            return userId;
        }

        return function(tpl) {
            var instance = $modal.open({
                templateUrl: tpl,
                controller: 'SelectModalCtrl',
                controllerAs: 'Ctrl',
                bindToController: true
            });

            return instance.result.then(processSelect);
        };
    })
    .controller('SelectModalCtrl', function ($scope,$filter,userSessionService,userAuthService) {


        this.cancel = $scope.$dismiss;

        this.submit = function () {
            userAuthService.login(this.userId).then(function (userId) {
                $scope.$close(userId);
            });
        };

        this.userTypeOptions = [
            { value:1, text:"User"             },
            { value:2, text:"Host"             },
            { value:3, text:"Company Manager"  }
        ];


        this.showUserTypeOptions = function(){
            var selected = $filter('filter')( this.userTypeOptions, {value: this.currentUser.type});
            return ('undefined' != typeof selected && this.currentUser.type && selected.length)
                ?
                    selected[0].text
                :
                    "Select User Type";
        };
    })
    ;