describe('airportsService', () => {
  let airportsService;
  let $httpBackend;
  let $timeout;

  const statusOk = 200;
  const internalServerError = 500;

  const airportsFileRoute = '/app/core/airports.json';
  const airportsFlightsDataMock = mockData.getMockAirportsFlightsData();

  beforeEach(module('max-milhas-dashboard.core'));

  beforeEach(inject((_airportsService_, _$httpBackend_, _$timeout_) => {
    airportsService = _airportsService_;
    $httpBackend = _$httpBackend_;
    $timeout = _$timeout_;
  }));

  it('should exist the airportsService', () => {
    expect(airportsService).toBeDefined();
  });

  describe('airportsService function', () => {
    describe('success cases', () => {
      it('should exist the function getAirportsList', () => {
        expect(airportsService.getAirportsList).toBeDefined();
      });

      it('should return airports flights data', () => {
        $httpBackend
          .expectGET(airportsFileRoute)
          .respond(statusOk, airportsFlightsDataMock);
        const $httpFlush = $httpBackend.flush;

        let result;
        airportsService
          .getAirportsList()
          .then((airportsList) => {
            result = airportsList;
          })
          .finally(() => expect(JSON.stringify(result))
            .toEqual(JSON.stringify(airportsFlightsDataMock.airports)));
        $httpFlush();
        $timeout.flush();
      });
    });

    describe('error cases', () => {
      it('could not get data: should return an error message', () => {
        const errorMessageData = 'File does not exists.';

        $httpBackend
          .expectGET(airportsFileRoute)
          .respond(internalServerError, errorMessageData);
        const $httpFlush = $httpBackend.flush;

        let result;
        airportsService
          .getAirportsList()
          .catch((errorMessage) => {
            result = errorMessage;
          })
          .finally(() => {
            const messageError = 'Failed to get airports list';

            expect(result.status).toEqual(internalServerError);
            expect(result.data).toContain(messageError);
          });
        $httpFlush();
        $timeout.flush();
      });
    });
  });
});
