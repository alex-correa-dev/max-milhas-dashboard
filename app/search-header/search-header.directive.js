(function() {
  /* @ngInject */
  function searchHeader() {
    const directive = {
      scope: {
        minDate: '=',
        getFlightsAirlinesList: '=',
        airports: '='
      },
      restrict: 'E',
      controller: 'searchHeaderCtrl',
      controllerAs: 'vm',
      bindToController: true,
      templateUrl: 'app/search-header/search-header.html'
    };

    return directive;
  }

  angular
    .module('max-milhas-dashboard.search-header')
    .directive('searchHeader', searchHeader);
})();
