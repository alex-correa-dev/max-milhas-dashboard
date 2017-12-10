(function() {
  function logger($log) {
    function error(message, data) {
      $log.error(`Error: ${message}`, data);
    }
  
    function info(message, data) {
      $log.info(`Info: ${message}`, data);
    }
  
    function success(message, data) {
      $log.info(`Success: ${message}`, data);
    }
  
    function warning(message, data) {
      $log.warn(`Warning: ${message}`, data);
    }
    
    const service = {
      showToasts: true,
      
      error,
      info,
      success,
      warning,
      
      log: $log.log
    };
    
    return service;
  }
  
  angular
  .module('blocks.logger')
  .factory('logger', logger);
  
  logger.$inject = ['$log'];
}());