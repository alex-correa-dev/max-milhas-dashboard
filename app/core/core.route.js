(function() {
  /* @ngInject */
  function appRun(routerHelper) {
    const otherwise = '/';
    routerHelper.configureStates([], otherwise);
  }

  angular.module('max-milhas-dashboard.core').run(appRun);
})();
