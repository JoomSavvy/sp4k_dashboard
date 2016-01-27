/**
 * Created by Ironman on 11/29/2015.
 */

angular.module( 'services.autocomplete.parents',['resources.parents'] )
    .service('AutocompleteParents', AutocompleteParents)
    .controller('ParentSearchCtrl',function ParentSearchController( $scope, $log, AutocompleteParents ){
        this.parent = AutocompleteParents.parent;
        this.searchText = AutocompleteParents.searchText;
        this.searchTextChange = function(text){
            return AutocompleteParents.searchTextChange(text);
        };
        this.selectedItemChange = function(item){
            return AutocompleteParents.selectedItemChange(item);
        };
        this.querySearch = function(searchText){
            return AutocompleteParents.querySearch(searchText);
        };
    });

    function AutocompleteParents(parentsRestService) {

        return {
            parent : null,
            searchText: "",
            getParent: function(){
                return this.parent;
            },
            searchTextChange: function(text){
                this.searchText = text;
            },
            selectedItemChange: function(item)
            {
                this.parent = item;
            },
            querySearch: function(searchText){
                if(searchText.length > 3){
                    console.log(searchText);
                    var q = {};
                    q.name = searchText;
                    var limit = {};
                    limit.offset = 0;
                    limit.limit = 50;
                    return parentsRestService.query({q:q,limit:limit}).$promise;
                }
            }
        }
    }