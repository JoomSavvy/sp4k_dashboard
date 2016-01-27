/**
 * Created by Ironman on 11/17/2015.
 */


(function () {
    'use strict';

    angular
        .module('sp4k')
        .factory('RouterTracker', RouterTracker);

    function RouterTracker($rootScope) {
        var routeHistory = [];
        var service = {
            getRouteHistory: getRouteHistory,
            popRouteHistory: popRouteHistory,
            putRoute: putRoute
        };

        $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
            console.log('boom');
            routeHistory.push({route: from, routeParams: fromParams});
            if(routeHistory.length >= 5){routeHistory = routeHistory.slice(routeHistory.length - 1)}
        });

        function getRouteHistory() {
            return routeHistory;
        }

        function popRouteHistory(){
            return routeHistory.pop();
        }

        function putRoute(ev, to, toParams, from, fromParams){
            routeHistory.push({route: from, routeParams: fromParams});
            if(routeHistory.length >= 5){routeHistory = routeHistory.slice(routeHistory.length - 1)}
        }

        return service;
    }
})();
