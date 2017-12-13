(function() {
  /* @ngInject */
  function airportsService($http, exception, maxMilhasConfig) {
    const route = maxMilhasConfig.airportsFile;

    function responseData(response) {
      return response.data.airports;
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
