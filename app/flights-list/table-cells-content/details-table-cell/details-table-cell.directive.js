(function() {
  /* @ngInject */
  function detailsTableCell() {
    const directive = {
      scope: {
        flightAirline: '='
      },
      restrict: 'E',
      controller: 'detailsTableCellCtrl',
      controllerAs: 'vm',
      bindToController: true,
      templateUrl:
        'app/flights-list/table-cells-content/details-table-cell/details-table-cell.html'
    };

    return directive;
  }

  angular
    .module('max-milhas-dashboard.flights-list')
    .directive('detailsTableCell', detailsTableCell);
})();
