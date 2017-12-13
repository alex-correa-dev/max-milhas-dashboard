(function() {
  function flightsList() {
    const directive = {
      scope: {
        flightsAirlinesList: '='
      },
      restrict: 'E',
      controller: 'flightsListCtrl',
      controllerAs: 'vm',
      bindToController: true,
      templateUrl: 'app/flights-list/flights-list.html'
    };

    return directive;
  }

  angular
    .module('max-milhas-dashboard.flights-list')
    .directive('flightsList', flightsList);
})();
