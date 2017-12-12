describe('flightPriceService', () => {
  const flightsDataMock = mockData.getMockFlightsData();
  const flightsAirlinesDataMock = mockData.getMockFlightsAirlinesData();
  const maxMilhasUrl = 'https://flight-price-hmg.maxmilhas.com.br/search';
  const maxMilhasToken =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJtYXhtaWxoYXMuY29tLmJyIiw' +
    'iaWF0IjoxNTA5MTIwMTAxLCJleHAiOjE1MTA0MTYxMDEsImF1ZCI6InRlc3RlLWZyb250ZW5kIiwic3ViIjoidGVzdGUt' +
    'ZnJvbnRlbmQiLCJlbnYiOiJobWcifQ.nM6wMem6dxF0CcDlig5iA9az5ZfmbXDjq1e4ypZXwjU';
  const statusOk = 200;
  const unprocessableEntity = 422;
  const notFound = 404;

  let flightPriceService;
  let $httpBackend;
  let $timeout;

  beforeEach(module('max-milhas-dashboard.core'));

  beforeEach(inject((_flightPriceService_, _$httpBackend_, _$timeout_) => {
    flightPriceService = _flightPriceService_;
    $httpBackend = _$httpBackend_;
    $timeout = _$timeout_;
  }));

  it('should exist the flightPriceService', () => {
    expect(flightPriceService).toBeDefined();
  });

  describe('searchFlights function', () => {
    describe('success cases', () => {
      it('should exist the function searchFlights', () => {
        expect(flightPriceService.searchFlights).toBeDefined();
      });

      it('should return flights data', () => {
        const timeParam = '2017-12-22';
        const url = `${maxMilhasUrl}?time=${timeParam}`;

        const data = {
          tripType: 'RT',
          from: 'REC',
          to: 'RIO',
          outboundDate: '2017-12-22',
          inboundDate: '2017-12-28',
          cabin: 'EC',
          adults: 2,
          children: 1,
          infants: 0
        };

        const applicationJson = 'application/json';
        const applicationJsonTextPlain = `${applicationJson}, text/plain, */*`;
        const headers = {
          Authorization: maxMilhasToken,
          'Content-Type': applicationJson,
          Accept: applicationJsonTextPlain
        };

        $httpBackend
          .expectPOST(url, data, headers)
          .respond(statusOk, flightsDataMock);
        const $httpFlush = $httpBackend.flush;

        let result;
        flightPriceService
          .searchFlights(data, timeParam)
          .then((flightsData) => {
            result = flightsData;
          })
          .finally(() => expect(JSON.stringify(result)).toEqual(JSON.stringify(flightsDataMock)));
        $httpFlush();
        $timeout.flush();
      });

      it('should exist the function searchFlightsAirlines', () => {
        expect(flightPriceService.searchFlightsAirlines).toBeDefined();
      });

      it('should return flights airlines data', () => {
        const searchId = '5a2ab0ee372cba2b8f941342';
        const airlineParam = 'latam';

        const url = `${maxMilhasUrl}/${searchId}/flights?airline=${airlineParam}`;

        const applicationJson = 'application/json';
        const headers = {
          Authorization: maxMilhasToken,
          Accept: applicationJson
        };

        $httpBackend
          .expectGET(url, headers)
          .respond(statusOk, flightsAirlinesDataMock);
        const $httpFlush = $httpBackend.flush;

        let result;
        flightPriceService
          .searchFlightsAirlines(searchId, airlineParam)
          .then((flightsAirlinesData) => {
            result = flightsAirlinesData;
          })
          .finally(() => expect(JSON.stringify(result)).toEqual(JSON.stringify(flightsAirlinesDataMock)));
        $httpFlush();
        $timeout.flush();
      });
    });

    describe('error cases', () => {
      it('data was not sent: should return an error message', () => {
        const timeParam = '2017-12-22';
        const url = `${maxMilhasUrl}?time=${timeParam}`;

        const data = {};

        const applicationJson = 'application/json';
        const applicationJsonTextPlain = `${applicationJson}, text/plain, */*`;
        const headers = {
          Authorization: maxMilhasToken,
          'Content-Type': applicationJson,
          Accept: applicationJsonTextPlain
        };

        const errorMessageData = {
          type: 'FromValidationError',
          message: 'from parameter is invalid'
        };

        $httpBackend
          .expectPOST(url, data, headers)
          .respond(unprocessableEntity, errorMessageData);
        const $httpFlush = $httpBackend.flush;

        let result;
        flightPriceService
          .searchFlights(data, timeParam)
          .catch((errorMessage) => {
            result = errorMessage;
          })
          .finally(() => {
            const messageError = 'Failed to search flights data';

            expect(result.status).toEqual(unprocessableEntity);
            expect(result.data).toContain(messageError);
          });
        $httpFlush();
        $timeout.flush();
      });

      it('searchId wrong, so, could find data: should return an error message', () => {
        const searchId = 'searchIdWrong';
        const airlineParam = 'latam';

        const url = `${maxMilhasUrl}/${searchId}/flights?airline=${airlineParam}`;

        const applicationJson = 'application/json';
        const headers = {
          Authorization: maxMilhasToken,
          Accept: applicationJson
        };

        const errorMessageData = {
          type: 'ResourceNotFoundError',
          message: 'Search searchIdWrong not found.'
        };

        $httpBackend
          .expectGET(url, headers)
          .respond(notFound, errorMessageData);
        const $httpFlush = $httpBackend.flush;

        let result;
        flightPriceService
          .searchFlightsAirlines(searchId, airlineParam)
          .catch((errorMessage) => {
            result = errorMessage;
          })
          .finally(() => {
            const messageError = 'Failed to search flights data';

            expect(result.status).toEqual(notFound);
            expect(result.data).toContain(messageError);
          });
        $httpFlush();
        $timeout.flush();
      });

      it('airlineParam not sent, so, could find data: should return an error message', () => {
        const searchId = '5a2ab0ee372cba2b8f941342';

        const url = `${maxMilhasUrl}/${searchId}/flights`;

        const applicationJson = 'application/json';
        const headers = {
          Authorization: maxMilhasToken,
          Accept: applicationJson
        };

        const errorMessageData = {
          type: 'ResourceNotFoundError',
          message:
            'Airline undefined not found on search 5a2ab0ee372cba2b8f941342.'
        };

        $httpBackend
          .expectGET(url, headers)
          .respond(notFound, errorMessageData);
        const $httpFlush = $httpBackend.flush;

        let result;
        flightPriceService
          .searchFlightsAirlines(searchId)
          .catch((errorMessage) => {
            result = errorMessage;
          })
          .finally(() => {
            const messageError = 'Failed to search flights data';

            expect(result.status).toEqual(notFound);
            expect(result.data).toContain(messageError);
          });
        $httpFlush();
        $timeout.flush();
      });
    });
  });
});
