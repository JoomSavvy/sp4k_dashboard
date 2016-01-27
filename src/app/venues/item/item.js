/**
 *
 */

angular.module( 'sp4k.venues.item', [
  'ui.router'
])
    

    
    /**
     * And of course we define a controller for our route.
     */
    .controller( 'VenuesItemCtrl', function VenuesItemController(
        $scope, $state, $stateParams, venuesRestService
    ) {
        this.item = {};
        clearTempContact();
        this.editContactIndex = false;

        if(typeof $stateParams.id !== 'undefined' ){
            this.item = venuesRestService.get({id:$stateParams.id});
        }else{
            this.item = venuesRestService.get();
        }

        this.saveItem = function(){
            venuesRestService.save(this.item).$promise.then(
                angular.bind(this,
                    function(data){
                        this.item.id = data.id;
                        $state.go('venues.item', {id:data.id}, {notify:false, reload:false});
                    }
                )
            );
        };

        this.editContact = function(index)
        {
            if(typeof index !== 'undefined'){
                this.editContactIndex = index;
                this.tempContact = copy(this.item.contacts[index]);
            }
        };

        this.commitContact = function()
        {
            this.item.contacts = this.item.contacts || [];
            if(this.editContactIndex){
                this.item.contacts[this.editContactIndex] = this.tempContact;
            }else{
                this.item.contacts.push(this.tempContact);
            }

            this.tempContact = {
                name:'',
                role:'',
                phone:'',
                email:''
            };
            this.editContactIndex = false;
        };

        this.cancelContact = function()
        {
            clearTempContact();
        };

        function clearTempContact()
        {
            this.tempContact = {
                name:'',
                role:'',
                phone:'',
                email:''
            };
        };

        this.statusOptions = [
            {
                id: 0,
                text: 'Inactive'
            },
            {
                id: 1,
                text: 'Active'
            }
        ];

        this.countyOptions = [
            {text:'Bedfordshire'},
            {text:'Berkshire'},
            {text:'Buckinghamshire'},
            {text:'Cambridgeshire'},
            {text:'Cheshire'},
            {text:'Cornwall'},
            {text:'Cumberland'},
            {text:'Derbyshire'},
            {text:'Devon'},
            {text:'Dorset'},
            {text:'County'},
            {text:'EssexGloucestershire'},
            {text:'Hampshire'},
            {text:'Southamptonshire'},
            {text:'Herefordshire'},
            {text:'Hertfordshire'},
            {text:'Huntingdonshire'},
            {text:'KentLancashire'},
            {text:'Leicestershire'},
            {text:'Lincolnshire'},
            {text:'Middlesex'},
            {text:'Norfolk'},
            {text:'Northamptonshire'},
            {text:'Northumberland'},
            {text:'Nottinghamshire'},
            {text:'Oxfordshire'},
            {text:'Rutland'},
            {text:'Shropshire'},
            {text:'Somerset'},
            {text:'Staffordshire'},
            {text:'Suffolk'},
            {text:'Surrey'},
            {text:'Sussex'},
            {text:'Warwickshire'},
            {text:'Westmorland'},
            {text:'Wiltshire'},
            {text:'Worcestershire'},
            {text:'Yorkshire'}
        ];

    })
;
    
