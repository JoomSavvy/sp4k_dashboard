/**
 *
 */

angular.module( 'sp4k.payments', [
    'resources.payments',
    'ui.router'
])

    .config(function config( $stateProvider ) {
      $stateProvider.state( 'payments', {
        url: '/payments',
        views: {
          "main@": {
            controller: 'PaymentsCtrl as Ctrl',
            templateUrl: 'payments/payments.tpl.html'
          }
        },
        data:{ pageTitle: 'Payments' },
        resolve: {
            paymentsRestService: 'paymentsRestService',
            payments: function(paymentsRestService){
                var payments = paymentsRestService.query();
                    return payments.$promise;
            }
        }
      });
    })

    .controller( 'PaymentsCtrl', function PaymentsController( $scope,payments ) {
        this.items = (function(payments){
            console.log(payments);
            return payments;
        })(payments);

        this.jsonParse = function(toParse){
            console.log(toParse);
            return JSON.parse(toParse);
        };
        console.log(payments);
    })

    ;

