/**
 * Created by Ironman on 8/29/2015.
 */


// loginModal.js
/*jshint laxbreak:true   */
angular.module('services.modal.login',['services.user.session','services.user.auth'])
    .config(function($httpProvider){
        $httpProvider.interceptors.push(function ($timeout, $q, $injector) {
            var loginModal, $http, $state;

            // this trick must be done so that we don't receive
            // `Uncaught Error: [$injector:cdep] Circular dependency found`
            $timeout(function () {
                loginModal = $injector.get('loginModal');
                $http = $injector.get('$http');
                $state = $injector.get('$state');
            });

            return {
                responseError: function (rejection) {
                    if (rejection.status !== 401) {
                        return rejection;
                    }

                    var deferred = $q.defer();
                    /*jshint es5: true */
                    loginModal()
                        .then(function () {
                            deferred.resolve( $http(rejection.config) );
                        })
                        .catch(function () {
                            $state.go('welcome');
                            deferred.reject(rejection);
                        });

                    return deferred.promise;
                }
            };
        });
    })
    .run(function($rootScope,$state,loginModal, userSessionService){
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            var requireLogin = toState.data.requireLogin;
            if (requireLogin && !userSessionService.isLoggedIn()) {
                event.preventDefault();

                loginModal()
                    .then(function () {
                        return $state.go(toState.name, toParams);
                    })
                    .catch(function () {
                        if(  typeof fromState.data == 'undefined' || fromState.data.requireLogin){
                            return $state.go('home');
                        }else{
                            return angular.noop();
                        }

                    });
            }
        });
    })
    .service('loginModal', function ($modal, $rootScope,userSessionService) {

        function assignCurrentUser (userId) {
            userSessionService.set(userId);
            return userId;
        }

        return function() {
            var instance = $modal.open({
                templateUrl: 'services/modal/login/loginModal.tpl.html',
                controller: 'LoginModalCtrl',
                controllerAs: 'LoginModalCtrl',
                bindToController: true
            });

            return instance.result.then(assignCurrentUser);
        };
    })
    .controller('LoginModalCtrl', function ($scope,$filter,userSessionService,userAuthService) {



        this.currentUser = userSessionService.get();
        this.userId = this.currentUser.id;

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