(function() {
  /* @ngInject */
  function resultsFilter() {
    const directive = {
      scope: {},
      restrict: 'E',
      controller: 'resultsFilterCtrl',
      controllerAs: 'vm',
      bindToController: true,
      templateUrl: 'app/results-filter/results-filter.html'
    };

    return directive;
  }

  angular
    .module('max-milhas-dashboard.results-filter')
    .directive('resultsFilter', resultsFilter);
})();
