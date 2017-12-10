(function() {
  /* @ngInject */
  function flightPriceService($http, exception, maxMilhasConfig) {
    const maxMilhasUrl = maxMilhasConfig.maxMilhasApi.url;
    const maxMilhasToken = maxMilhasConfig.maxMilhasApi.token;

    function searchFlightsData(response) {
      return response.data;
    }

    function searchFlightsFailed(error) {
      const messageError = 'Failed to search flights data';
      return exception.catcher(messageError)(error);
    }

    function searchFlights(data, timeParam) {
      const applicationJson = 'application/json';
      const headers = {
        headers: {
          Authorization: maxMilhasToken,
          'Content-Type': applicationJson
        }
      };

      const url = `${maxMilhasUrl}?time=${timeParam}`;

      return $http
        .post(url, data, headers)
        .then(searchFlightsData)
        .catch(searchFlightsFailed);
    }

    const service = {
      searchFlights
    };

    return service;
  }

  angular
    .module('max-milhas-dashboard.core')
    .factory('flightPriceService', flightPriceService);
})();
