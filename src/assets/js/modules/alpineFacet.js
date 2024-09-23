export default () => ({
  searchFilter:'',
  categoryFilter:[],
  results:[],
  filteredResults:[],
  init() {
    // You can render the initial json data in a hidden pre tag 
    this.results = JSON.parse(document.getElementById('json-data').innerHTML);
    this.filteredResults = this.results;

    // Set up watchers for inputs
    this.$watch('searchFilter', () => this.updateFilter() );
    this.$watch('categoryFilter', () => this.updateFilter() );

    // handle query params on load
    let qp = new URLSearchParams(window.location.search);
    if(qp.get('search')) this.searchFilter = qp.get('search');

    let categoryFilterParams = qp.get('categoryFilter');
    if(categoryFilterParams) {
      this.categoryFilter = categoryFilterParams.split(',');
    }
  },
  updateFilter() {
    this.filteredResults = this.results.filter(result => {
      // check if search exists and whether it matches if so - if not bail early and omit
      if(this.searchFilter !== '' && result.title.toLowerCase().indexOf(this.searchFilter.toLowerCase()) === -1) return false;

      // check if no filters applied, if so return true early with no category filtering
      if(this.categoryFilter.length === 0){
        return true
      }

      // if a category filter exists, check if category matches - if any does, return true (additive)
      if(this.categoryFilter.length > 0){
        const itemCategorySet = new Set(result.categories)
        if(this.categoryFilter.some(key => itemCategorySet.has(key))){
          return true
        }
      } 

      // otherwise, no matches with current filters - return false
      return false
    });

    // add query params based on changes
    this.updateURL()

    // if the list length changes we need ST to recalculate for any items below the results
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200)

  },
  // you can tie this to a button to clear all filters
  clearAllFilters(){
    this.categoryFilter = []
    this.updateFilter()
  },
  // or tie this to a button for clearing filters and search
  resetAll(){
    this.searchFilter = ""
    this.categoryFilter = []
    this.updateFilter()
  },
  updateURL() {
    // TODO: clean up this logic to handle deselection of all filters gracefully
    let qp = new URLSearchParams();
    if(this.searchFilter !== '') qp.set('search', this.searchFilter);
    if(this.categoryFilter.length) qp.set('categoryFilter', this.categoryFilter);
    history.replaceState(null, null, "?"+qp.toString());
  }
})