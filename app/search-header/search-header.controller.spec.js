describe('searchHeaderCtrl', () => {
  let controller;
  let airportsService;
  let $rootScope;
  let $httpBackend;
  let $timeout;
  let $q;

  const statusOk = 200;

  const airportsFileRoute = '/app/core/airports.json';
  const airportsFlightsDataMock = mockData.getMockAirportsFlightsData();

  const listAirports = [
    'Nova Iorque - Todos',
    'Belo Horizonte - Todos',
    'Rio de Janeiro - Todos'
  ];

  beforeEach(module('max-milhas-dashboard.search-header'));
  beforeEach(module('max-milhas-dashboard.core'));

  beforeEach(inject((_$controller_, _$rootScope_, _airportsService_, _$httpBackend_, _$timeout_, _$q_) => {
    $timeout = _$timeout_;
    $rootScope = _$rootScope_;
    $q = _$q_;
    airportsService = _airportsService_;
    $httpBackend = _$httpBackend_;
    $rootScope.$apply();

    $httpBackend
      .expectGET(airportsFileRoute)
      .respond(statusOk, airportsFlightsDataMock);
    const $httpFlush = $httpBackend.flush;

    controller = _$controller_('searchHeaderCtrl', { airportsService });

    $httpFlush();
    $timeout.flush();
  }));

  describe('searchHeaderCtrl controller: functional tests', () => {
    it('controller should be created successfully', () => {
      expect(controller).toBeDefined();
    });

    it('Test the getAirportsList function with a success call', () => {
      spyOn(airportsService, 'getAirportsList').and.callFake(() => $q.when(listAirports));

      controller.init().then((data) => {
        expect(JSON.stringify(data)).toEqual(JSON.stringify(listAirports));
      });
    });

    it('Test the querySearch with a defined query', () => {
      const query = 'nova';

      controller.airportsList = listAirports;
      const listAirportsExpected = ['Nova Iorque - Todos'];

      expect(JSON.stringify(controller.querySearch(query))).toEqual(JSON.stringify(listAirportsExpected));
    });

    it('Test the querySearch with a without a defined query', () => {
      const query = '';

      controller.airportsList = listAirports;
      const listAirportsExpected = [
        'Nova Iorque - Todos',
        'Belo Horizonte - Todos',
        'Rio de Janeiro - Todos'
      ];

      expect(JSON.stringify(controller.querySearch(query))).toEqual(JSON.stringify(listAirportsExpected));
    });
  });
});
