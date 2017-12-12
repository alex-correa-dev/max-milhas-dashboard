(function() {
  /* @ngInject */
  function searchHeaderCtrl(airportsService) {
    const vm = this;

    function init() {
      return airportsService.getAirportsList().then((airportsList) => {
        vm.airportsList = airportsList;
        return airportsList;
      });
    }

    function createFilterFor(query) {
      return function filterFn(airportFlight) {
        return new RegExp(query, 'i').test(airportFlight);
      };
    }

    vm.querySearch = (query) => {
      if (vm.airportsList && query) {
        return vm.airportsList.filter(createFilterFor(query));
      }
      return vm.airportsList;
    };

    vm.init = init;
    init();
  }

  searchHeaderCtrl.$inject = ['airportsService'];

  angular
    .module('max-milhas-dashboard.search-header')
    .controller('searchHeaderCtrl', searchHeaderCtrl);
})();
