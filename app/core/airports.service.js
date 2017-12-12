(function() {
  /* @ngInject */
  function airportsService($http, exception, maxMilhasConfig) {
    const route = maxMilhasConfig.airportsFile;

    function responseData(response) {
      const airports = response.data.airports;

      return Object.keys(airports).map(airportFlightId => {
        const nameAirport = 0;
        return airports[airportFlightId][nameAirport];
      });
    }

    function responseFailed(error) {
      const messageError = 'Failed to get airports list';
      return exception.catcher(messageError)(error);
    }

    function getAirportsList() {
      return $http
        .get(route)
        .then(responseData)
        .catch(responseFailed);
    }

    const service = {
      getAirportsList
    };

    return service;
  }

  angular
    .module('max-milhas-dashboard.core')
    .factory('airportsService', airportsService);
})();
