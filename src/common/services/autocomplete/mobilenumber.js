/**
 * Created by Ironman on 11/29/2015.
 */

angular.module( 'services.autocomplete.mobilenumber',['resources.parents'] )
    .service('AutocompleteMobilenumber', AutocompleteMobilenumber)
    .controller('ParentMobilenumberSearchCtrl',function ParentMobilenumberSearchController( $scope, $log, AutocompleteMobilenumber ){
        this.parent = AutocompleteMobilenumber.parent;
        this.searchText = AutocompleteMobilenumber.searchText;
        this.searchTextChange = function(text){
            return AutocompleteMobilenumber.searchTextChange(text);
        };
        this.selectedItemChange = function(item){
            return AutocompleteMobilenumber.selectedItemChange(item);
        };
        this.querySearch = function(searchText){
            return AutocompleteMobilenumber.querySearch(searchText);
        };
    });

function AutocompleteMobilenumber(parentsRestService,$log) {

    return {
        parent : {id:null},
        searchText: '',
        getParent: function(){
            return this.parent;
        },
        searchTextChange: function(text){
            this.searchText = text;
        },
        selectedItemChange: function(item)
        {
            console.log(this.parent);
            this.parent = item;
            $log.log(item);
            console.log(parent);
            console.log(this.parent);
        },
        querySearch: function(searchText){
            if(this.searchText.length > 3){
                console.log(searchText);
                var q = {};
                q.phone_mobile = searchText;
                var limit = {};
                limit.offset = 0;
                limit.limit = 50;
                return parentsRestService.query({q:q,limit:limit}).$promise;
            }
        }
        //querySearch: function(searchText){
        //    if(this.searchText.length > 3){
        //        console.log(searchText);
        //        var filters = {};
        //        filters.phone_mobile = searchText;
        //        var limit = {};
        //        limit.offset = 0;
        //        limit.limit = 50;
        //        return parentsRestService.query({filters:filters,limit:limit,paging:true}).$promise;
        //    }
        //}
    }
}