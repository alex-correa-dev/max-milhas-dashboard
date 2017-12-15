(function() {
  /* @ngInject */
  function searchHeaderCtrl(airportsService, helpersService, $interval) {
    const vm = this;
    const airportsNameCode = {};
    vm.loading = false;
    vm.numbersList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    vm.classesList = ['Classe Econômica', 'Classe Executiva'];
    vm.departurePlace = '';
    vm.returnPlace = '';
    vm.departureDate = null;
    vm.returnDate = null;
    vm.class = '';
    vm.numberAdults = 0;
    vm.numberChildren = 0;
    vm.numberInfants = 0;

    function init() {
      return airportsService.getAirportsList().then((airports) => {
        vm.airportsList = Object.keys(airports).map((airportFlightId) => {
          const nameAirportIndex = 0;
          const nameAirport = airports[airportFlightId][nameAirportIndex];

          airportsNameCode[nameAirport] = airportFlightId;

          return nameAirport;
        });

        vm.airports = airports;

        return vm.airportsList;
      });
    }

    vm.numberPassagers = function() {
      return (
        parseInt(vm.numberAdults, 10) +
        parseInt(vm.numberChildren, 10) +
        parseInt(vm.numberInfants, 10)
      );
    };

    const tick = function() {
      vm.clock = helpersService.getTimeFormated();
    };

    tick();
    $interval(tick, 1000);

    vm.getLiveTime = function() {
      return helpersService.getTimeFormated();
    };

    function createFilterFor(query) {
      return function filterFn(airportFlight) {
        return new RegExp(query, 'i').test(airportFlight);
      };
    }

    vm.getAirportCode = function(place) {
      return airportsNameCode[place];
    };

    vm.querySearch = (query) => {
      if (vm.airportsList && query) {
        return vm.airportsList.filter(createFilterFor(query));
      }

      return vm.airportsList;
    };

    vm.getFlightsAirlines = function() {
      if (vm.departurePlace === vm.returnPlace) {
        vm.searchDataForm.departurePlace.$error.validationError = true;
        vm.searchDataForm.returnPlace.$error.validationError = true;
      } else if (
        Number(vm.numberChildren) + Number(vm.numberInfants) >
        Number(vm.numberAdults)
      ) {
        vm.searchDataForm.class.$error.childrenError = true;
      } else if (Number(vm.numberAdults) === 0) {
        vm.searchDataForm.class.$error.numberPeople = true;
      } else {
        vm.loading = true;

        const data = {
          tripType: 'RT',
          from: vm.getAirportCode(vm.departurePlace),
          to: vm.getAirportCode(vm.returnPlace),
          outboundDate: helpersService.getFormatedDate(new Date(vm.departureDate)),
          inboundDate: helpersService.getFormatedDate(new Date(vm.returnDate)),
          cabin: vm.class === 'Classe Executiva' ? 'EX' : 'EC',
          adults: parseInt(vm.numberAdults, 10),
          children: parseInt(vm.numberChildren, 10),
          infants: parseInt(vm.numberInfants, 10)
        };

        return vm.getFlightsAirlinesList(data).finally(() => {
          vm.loading = false;
        });
      }
    };

    vm.init = init;
    init();
  }

  searchHeaderCtrl.$inject = ['airportsService', 'helpersService', '$interval'];

  angular
    .module('max-milhas-dashboard.search-header')
    .controller('searchHeaderCtrl', searchHeaderCtrl);
})();
