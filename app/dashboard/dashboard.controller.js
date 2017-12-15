(function() {
  /* @ngInject */
  function Dashboard($q, flightPriceService, logger, helpersService) {
    const vm = this;
    vm.minDate = new Date();
    vm.flightsAirlinesList = [];

    function capitalizeFirstLetter(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }

    function getAirportName(from) {
      const airportNamePosition = 0;
      return vm.airports[from][airportNamePosition];
    }

    function getDetails(data) {
      const boardRate =
        data.pricing.airline &&
        data.pricing.airline.adult.fees.find(fee => fee.type === 'BOARDING_TAX')
          .value;
      const convenienceRate = data.pricing.miles.offer.price || 0.0;
      return `TEMPO DE DURAÇÃO TOTAL: ${helpersService.getTimeFormated(data.duration)} | \
      TAXA DE EMBARQUE (POR ADULTO): R$ ${boardRate} | \
      TAXA DE CONVENIÊNCIA (POR ADULTO): R$ ${Math.round(convenienceRate * 100) / 100} | \
      MILHAS DO VOO (POR ADULTO): ${Math.round(data.pricing.miles.fareTotal * 100) / 100}`;
    }

    function convertMinutesToHours(duration) {
      let hours = Math.floor(duration / 60);
      let minutes = duration % 60;
      hours = hours < 10 ? `0${hours}` : hours;
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      return `${hours}H${minutes}`;
    }

    function searchFlightsAirlines(result) {
      result.forEach((flightsAirline) => {
        const bestPrice =
          flightsAirline.bestPrice && flightsAirline.bestPrice.inbound;

        flightsAirline.inbound.forEach((inboundData) => {
          const inbound = {};
          inbound.airline = capitalizeFirstLetter(inboundData.airline);
          inbound.flightNumber = inboundData.flightNumber;
          inbound.departureDate = helpersService.getTimeFormated(inboundData.departureDate);
          inbound.from = getAirportName(inboundData.from);
          inbound.duration = convertMinutesToHours(inboundData.duration);
          inbound.arrivalDate = helpersService.getTimeFormated(inboundData.arrivalDate);
          inbound.to = getAirportName(inboundData.to);
          inbound.details = getDetails(inboundData);
          inbound.price =
            (inboundData.pricing.airline &&
              inboundData.pricing.airline.saleTotal.toFixed(2)) ||
            0.0;
          inbound.bestPrice = inboundData.id === bestPrice && bestPrice;
          inbound.economy =
            inboundData.pricing.miles.saleTotal -
            inboundData.pricing.airline.saleTotal;

          vm.flightsAirlinesList.push(inbound);
        });
      });

      return vm.flightsAirlinesList;
    }

    function searchFlightsResponse(flights) {
      const searchId = flights.id;

      const enabledAirlines = flights.airlines.filter(airline => airline.status.enable);
      const searchFlightsAirlinesPromises = enabledAirlines.map(airline =>
        flightPriceService.searchFlightsAirlines(searchId, airline.label));

      return $q
        .all(searchFlightsAirlinesPromises)
        .then(searchFlightsAirlines)
        .catch((errFindingFlightsAirlines) => {
          logger.error(`Error finding flights by airlines: ${errFindingFlightsAirlines}`);
        });
    }

    vm.getFlightsAirlinesList = function(data) {
      const time = helpersService.getFormatedDate(new Date());

      return flightPriceService
        .searchFlights(data, time)
        .then(searchFlightsResponse)
        .catch((errFindingFlights) => {
          logger.error(`Error finding flights: ${errFindingFlights}`);
        });
    };
  }

  Dashboard.$inject = ['$q', 'flightPriceService', 'logger', 'helpersService'];

  angular
    .module('max-milhas-dashboard.dashboard')
    .controller('Dashboard', Dashboard);
})();
