(function() {
  function pricesAlert() {
    const directive = {
      scope: {},
      restrict: 'E',
      controller: 'pricesAlertCtrl',
      controllerAs: 'vm',
      bindToController: true,
      templateUrl: 'app/prices-alert/prices-alert.html'
    };

    return directive;
  }

  angular
    .module('max-milhas-dashboard.prices-alert')
    .directive('pricesAlert', pricesAlert);
})();
