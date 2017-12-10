describe('flightPriceService', () => {
  const flightsDataMock = mockData.getMockflightsData();
  const maxMilhasUrl = 'https://flight-price-hmg.maxmilhas.com.br/search';
  const maxMilhasToken =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJtYXhtaWxoYXMuY29tLmJyIiw' +
    'iaWF0IjoxNTA5MTIwMTAxLCJleHAiOjE1MTA0MTYxMDEsImF1ZCI6InRlc3RlLWZyb250ZW5kIiwic3ViIjoidGVzdGUt' +
    'ZnJvbnRlbmQiLCJlbnYiOiJobWcifQ.nM6wMem6dxF0CcDlig5iA9az5ZfmbXDjq1e4ypZXwjU';
  const success = 200;
  const unprocessableEntity = 422;

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
        .respond(success, flightsDataMock);
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
  });
});
