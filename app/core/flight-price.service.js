(function() {
  /* @ngInject */
  function flightPriceService($http, exception, maxMilhasConfig) {
    const maxMilhasUrl = maxMilhasConfig.maxMilhasApi.url;
    const maxMilhasToken = maxMilhasConfig.maxMilhasApi.token;

    function responseData(response) {
      return response.data;
    }

    function responseFailed(error) {
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
        .then(responseData)
        .catch(responseFailed);
    }

    function searchFlightsAirlines(searchId, airlineParam) {
      const params = {};

      if (airlineParam) {
        params.airline = airlineParam;
      }

      const url = `${maxMilhasUrl}/${searchId}/flights`;

      const applicationJson = 'application/json';
      const config = {
        params,
        headers: {
          Authorization: maxMilhasToken,
          Accept: applicationJson
        }
      };

      return $http
        .get(url, config)
        .then(responseData)
        .catch(responseFailed);
    }

    const service = {
      searchFlights,
      searchFlightsAirlines
    };

    return service;
  }

  angular
    .module('max-milhas-dashboard.core')
    .factory('flightPriceService', flightPriceService);
})();
