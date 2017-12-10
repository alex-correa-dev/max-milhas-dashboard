describe('core', () => {
  describe('state', () => {
    let $state;
    let $rootScope;
    let $location;

    beforeEach(module('max-milhas-dashboard.core'));

    beforeEach(inject((_$state_, _$rootScope_, _$location_) => {
      $state = _$state_;
      $rootScope = _$rootScope_;
      $location = _$location_;
    }));

    it('dashboard should work with $state.go', () => {
      $state.go('dashboard');
      $rootScope.$apply();
      expect($state.is('dashboard'));
    });

    it('should route / to the dashboard route', () => {
      $location.path('/');
      $rootScope.$apply();
      expect($state.is('dashboard'));
    });

    it('should route /invalid to the otherwise (dashboard) route', () => {
      $location.path('/invalid');
      $rootScope.$apply();
      expect($state.is('dashboard'));
    });
  });
});
