(function() {
  /* @ngInject */
  function resultsFilterCtrl($mdBottomSheet) {
    const vm = this;
    vm.showResultsFilterList = function() {
      $mdBottomSheet.show({
        templateUrl: 'app/results-filter/results-filter-list.html',
        controller: 'resultsFilterListCtrl'
      });
    };
  }

  resultsFilterCtrl.$inject = ['$mdBottomSheet'];

  angular
    .module('max-milhas-dashboard.results-filter')
    .controller('resultsFilterCtrl', resultsFilterCtrl);
})();
