(function() {
  /* @ngInject */
  function routerHelperProvider($locationProvider, $stateProvider, $urlRouterProvider) {
    const config = {
      docTitle: undefined,
      resolveAlways: {}
    };
    
    $locationProvider.html5Mode(true);
    
    this.configure = function(cfg) {
      angular.extend(config, cfg);
    };
    
    /* @ngInject */
    function RouterHelper($location, $rootScope, $state, logger) {
      let handlingStateChangeError = false;
      let hasOtherwise = false;
      const stateCounts = {
        errors: 0,
        changes: 0
      };
      
      function getStates() {
        return $state.get();
      }
  
      function configureStates(states, otherwisePath) {
        states.forEach((state) => {
          state.config.resolve =
            angular.extend(state.config.resolve || {}, config.resolveAlways);
          $stateProvider.state(state.state, state.config);
        });
        
        if (otherwisePath && !hasOtherwise) {
          hasOtherwise = true;
          $urlRouterProvider.otherwise(otherwisePath);
        }
      }
      
      const service = {
        configureStates,
        getStates,
        stateCounts
      };
  
      function handleRoutingErrors() {
        $rootScope.$on('$stateChangeError',
          (event, toState, toParams, fromState, fromParams, error) => {
            if (handlingStateChangeError) {
              return;
            }
            stateCounts.errors++;
            handlingStateChangeError = true;
            const destination = (toState &&
              (toState.title || toState.name || toState.loadedTemplateUrl)) ||
              'unknown target';
            const msg = `Error routing to ${destination}. ${error.data}. <br/>${error.statusText}: ${error.status}`;
            logger.warning(msg, [toState]);
            $location.path('/');
          }
        );
      }
  
      function updateDocTitle() {
        $rootScope.$on('$stateChangeSuccess',
          (event, toState) => {
            stateCounts.changes++;
            handlingStateChangeError = false;
            const title = `config.docTitle ${toState.title}`;
            $rootScope.title = title;
          }
        );
      }
  
      function init() {
        handleRoutingErrors();
        updateDocTitle();
      }
  
      init();
      
      return service;
    }
  
    this.$get = RouterHelper;
    RouterHelper.$inject = ['$location', '$rootScope', '$state', 'logger'];
  }
  
  angular
  .module('blocks.router')
  .provider('routerHelper', routerHelperProvider);
  
  routerHelperProvider.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
})();
