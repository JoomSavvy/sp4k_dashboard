/**
 * Created by Ironman on 11/29/2015.
 */

angular.module( 'services.autocomplete.children',['resources.children'] )
    .service('AutocompleteChildren', AutocompleteChildren)
    .controller('ChildSearchCtrl',function ChildSearchController( $scope, AutocompleteChildren ){
        this.child = AutocompleteChildren.child;
        this.searchText = AutocompleteChildren.searchText;
        this.searchTextChange = function(text){
            return AutocompleteChildren.searchTextChange(text);
        };
        this.selectedItemChange = function(item){
            return AutocompleteChildren.selectedItemChange(item);
        };
        this.querySearch = function(searchText){
            return AutocompleteChildren.querySearch(searchText);
        };
    });

    function AutocompleteChildren(childrenRestService) {

        return {
            child : {id:null},
            searchText: '',
            getChild: function(){
                return this.child;
            },
            searchTextChange: function(text){
                this.searchText = text;
            },
            selectedItemChange: function(item)
            {
                this.child = item;
            },
            querySearch: function(searchText){
                if(this.searchText.length > 3){
                    console.log(searchText);
                    var q = {};
                    q.name = searchText;
                    var limit = {};
                    limit.offset = 0;
                    limit.limit = 50;
                    return childrenRestService.query({q:q,limit:limit}).$promise;
                }
            }
        }
    }