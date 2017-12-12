(function() {
  const core = angular.module('max-milhas-dashboard.core');

  core.config(mdDateCalendar);

  mdDateCalendar.$inject = ['$mdDateLocaleProvider', '$windowProvider'];
  /* @ngInject */
  function mdDateCalendar($mdDateLocaleProvider, $windowProvider) {
    const $window = $windowProvider.$get();

    $mdDateLocaleProvider.shortMonths = [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez'
    ];
    $mdDateLocaleProvider.shortDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

    $mdDateLocaleProvider.formatDate = function(date) {
      const indexMonths = {
        0: 'Janeiro',
        1: 'Fevereiro',
        2: 'Março',
        3: 'Abril',
        4: 'Maio',
        5: 'Junho',
        6: 'Julho',
        7: 'Agosto',
        8: 'Setembro',
        9: 'Outubro',
        10: 'Novembro',
        11: 'Dezembro'
      };

      if (date) {
        const mobileScreenSize = 480;

        const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        const monthIndex =
          $window.innerWidth < mobileScreenSize
            ? indexMonths[date.getMonth()].substring(0, 3)
            : indexMonths[date.getMonth()];
        const year = date.getFullYear();

        return `${day} ${monthIndex} ${year}`;
      }
      return '';
    };
  }
})();
