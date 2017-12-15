(function() {
  /* @ngInject */
  function helpersService() {
    function getFormatedDate(date) {
      const year = date.getFullYear();
      const month =
        date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1;
      const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

      return `${year}-${month}-${day}`;
    }

    function getTimeFormated(notFormatedDate) {
      const date =
        notFormatedDate === undefined ? new Date() : new Date(notFormatedDate);
      const hours =
        date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
      const minutes =
        date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
      return `${hours}:${minutes}`;
    }

    const service = {
      getFormatedDate,
      getTimeFormated
    };

    return service;
  }

  angular
    .module('max-milhas-dashboard.core')
    .factory('helpersService', helpersService);
})();
