(function() {
  /* @ngInject */
  function flightsListCtrl($window) {
    const vm = this;

    vm.isMobile = function() {
      return $window.innerWidth < 480;
    };
  }

  flightsListCtrl.$inject = ['$window'];

  angular
    .module('max-milhas-dashboard.flights-list')
    .controller('flightsListCtrl', flightsListCtrl);
})();
