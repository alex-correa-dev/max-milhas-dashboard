(function() {
  /* @ngInject */
  function Dashboard($q, flightPriceService, logger) {
    const vm = this;
    vm.minDate = new Date();
    vm.flightsAirlinesList = [];

    function capitalizeFirstLetter(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }

    function getTimeFormated(notFormatedDate) {
      const date = new Date(notFormatedDate);
      const hours =
        date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
      const minutes =
        date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
      return `${hours}:${minutes}`;
    }

    function getAirportName(from) {
      const airportNamePosition = 0;
      return vm.airports[from][airportNamePosition];
    }

    function getDetails(data) {
      const boardRate = data.pricing.airline.adult.fees.find(fee => fee.type === 'BOARDING_TAX').value;
      const convenienceRate = data.pricing.miles.offer.price || 0.0;
      return `TEMPO DE DURAÇÃO TOTAL: ${getTimeFormated(data.duration)} | \
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

    vm.getFlightsAirlinesList = function() {
      const data = {
        tripType: 'RT',
        from: 'REC',
        to: 'RIO',
        outboundDate: '2017-12-22',
        inboundDate: '2017-12-28',
        cabin: 'EC',
        adults: 2,
        children: 1,
        infants: 0
      };

      const date = new Date();
      const year = date.getFullYear();
      const month =
        date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1;
      const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

      const time = `${year}-${month}-${day}`;

      return flightPriceService
        .searchFlights(data, time)
        .then((flights) => {
          const searchId = flights.id;

          const enabledAirlines = flights.airlines.filter(airline => airline.status.enable);
          const searchFlightsAirlinesPromises = enabledAirlines.map(airline =>
            flightPriceService.searchFlightsAirlines(searchId, airline.label));

          return $q
            .all(searchFlightsAirlinesPromises)
            .then((result) => {
              result.forEach((flightsAirline) => {
                // const bestPrice = flightsAirline.bestPrice;

                flightsAirline.inbound.forEach((inboundData) => {
                  const inbound = {};
                  inbound.airline = capitalizeFirstLetter(inboundData.airline);
                  inbound.flightNumber = inboundData.flightNumber;
                  inbound.departureDate = getTimeFormated(inboundData.departureDate);
                  inbound.from = getAirportName(inboundData.from);
                  inbound.duration = convertMinutesToHours(inboundData.duration);
                  inbound.arrivalDate = getTimeFormated(inboundData.arrivalDate);
                  inbound.to = getAirportName(inboundData.to);
                  inbound.details = getDetails(inboundData);

                  vm.flightsAirlinesList.push(inbound);
                });
              });

              return vm.flightsAirlinesList;
            })
            .catch((errFindingFlightsAirlines) => {
              logger.error(`Error finding flights by airlines: ${errFindingFlightsAirlines}`);
            });
        })
        .catch((errFindingFlights) => {
          logger.error(`Error finding flights: ${errFindingFlights}`);
        });
    };
  }

  Dashboard.$inject = ['$q', 'flightPriceService', 'logger'];

  angular
    .module('max-milhas-dashboard.dashboard')
    .controller('Dashboard', Dashboard);
})();
