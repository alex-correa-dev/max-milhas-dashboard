(function() {
  /* @ngInject */
  function searchHeaderCtrl(airportsService) {
    const vm = this;
    vm.loading = false;
    vm.numbersList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    vm.classesList = ['Classe econômica', 'Classe Executiva'];

    function init() {
      return airportsService.getAirportsList().then((airports) => {
        vm.airportsList = Object.keys(airports).map(airportFlightId => {
          const nameAirport = 0;
          return airports[airportFlightId][nameAirport];
        });

        vm.airports = airports;

        return vm.airportsList;
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

    vm.getFlightsAirlines = function() {
      vm.loading = true;
      return vm.getFlightsAirlinesList().finally(() => {
        vm.loading = false;
      });
    };

    vm.init = init;
    init();
  }

  searchHeaderCtrl.$inject = ['airportsService'];

  angular
    .module('max-milhas-dashboard.search-header')
    .controller('searchHeaderCtrl', searchHeaderCtrl);
})();
