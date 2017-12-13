describe('resultsFilterCtrl', () => {
  let controller;
  let $rootScope;
  let $mdBottomSheet;

  beforeEach(module('max-milhas-dashboard.core'));
  beforeEach(module('max-milhas-dashboard.results-filter'));

  beforeEach(inject((_$controller_, _$rootScope_, _$mdBottomSheet_) => {
    $mdBottomSheet = _$mdBottomSheet_;
    $rootScope = _$rootScope_;
    $rootScope.$apply();

    controller = _$controller_('resultsFilterCtrl', { $mdBottomSheet });
  }));

  describe('resultsFilterCtrl controller: unit tests', () => {
    it('controller should be created successfully', () => {
      expect(controller).toBeDefined();
    });

    it('verify if function showResultsFilterList was correctly called', () => {
      spyOn($mdBottomSheet, 'show');
      const args = {
        templateUrl: 'app/results-filter/results-filter-list.html',
        controller: 'resultsFilterListCtrl'
      };

      controller.showResultsFilterList();

      expect($mdBottomSheet.show).toHaveBeenCalledWith(args);
    });
  });
});
