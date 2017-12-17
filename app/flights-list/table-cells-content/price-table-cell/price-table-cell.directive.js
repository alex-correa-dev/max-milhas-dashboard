(function() {
  /* @ngInject */
  function priceTableCell() {
    const directive = {
      scope: {
        flightAirline: '='
      },
      restrict: 'E',
      controller: 'detailsTableCellCtrl',
      controllerAs: 'vm',
      bindToController: true,
      templateUrl:
        'app/flights-list/table-cells-content/price-table-cell/price-table-cell.html'
    };

    return directive;
  }

  angular
    .module('max-milhas-dashboard.flights-list')
    .directive('priceTableCell', priceTableCell);
})();
