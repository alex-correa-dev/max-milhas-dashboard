(function() {
  /* @ngInject */
  function exception($q, logger) {
    function catcher(message) {
      return function(e) {
        let thrownDescription;
        let newMessage;
        
        if (e.data) {
          thrownDescription = `\n${e.data}`;
          newMessage = message + thrownDescription;
        }
        
        e.data = newMessage;
        logger.error(message, e);
        
        return $q.reject(e);
      };
    }
    
    const service = {
      catcher
    };
    
    return service;
  }
  
  angular
  .module('blocks.exception')
  .factory('exception', exception);
})();
