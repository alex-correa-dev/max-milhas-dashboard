(function() {
  /* @ngInject */
  function maxMilhasConfig() {
    return {
      maxMilhasApi: {
        url: 'https://flight-price-hmg.maxmilhas.com.br/search',
        token:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJtYXhtaWxoYXMuY29tLmJyIiwiaWF0IjoxNTA5MTIwMT' +
          'AxLCJleHAiOjE1MTA0MTYxMDEsImF1ZCI6InRlc3RlLWZyb250ZW5kIiwic3ViIjoidGVzdGUtZnJvbnRlbmQiLCJlb' +
          'nYiOiJobWcifQ.nM6wMem6dxF0CcDlig5iA9az5ZfmbXDjq1e4ypZXwjU'
      },
      airportsFile: '/app/core/airports.json'
    };
  }

  angular
    .module('max-milhas-dashboard.core')
    .factory('maxMilhasConfig', maxMilhasConfig);
})();
