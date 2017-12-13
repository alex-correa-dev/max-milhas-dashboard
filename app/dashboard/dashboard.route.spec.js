describe('dashboard', () => {
  xdescribe('state', () => {
    let $state;
    let $rootScope;
    let $templateCache;

    const views = {
      dashboard: 'app/dashboard/dashboard.html'
    };

    beforeEach(module('max-milhas-dashboard.core'));

    beforeEach(inject((_$rootScope_, _$state_, _$templateCache_) => {
      $rootScope = _$rootScope_;
      $state = _$state_;
      $templateCache = _$templateCache_;
      $templateCache.put(views.dashboard, '');
    }));

    it('should map / route to dashboard View template', () => {
      expect($state.get('dashboard').templateUrl).toEqual(views.dashboard);
    });

    it('should map state dashboard to url / ', () => {
      expect($state.href('dashboard', {})).toEqual('/');
    });

    it('route of dashboard should work with $state.go', () => {
      $state.go('dashboard');
      $rootScope.$apply();
      expect($state.is('dashboard'));
    });
  });
});
