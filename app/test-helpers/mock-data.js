/* eslint-disable no-unused-vars */
const mockData = (function() {
  function getMockFlightsData() {
    return {
      id: '5a2d230076c4132b892ddc07',
      createdDate: '2017-12-10T12:05:20.262Z',
      legacyId: '68833521',
      isInternational: false,
      isMercosul: true,
      fromCountry: 'BR',
      toCountry: 'BR',
      airlines: [
        {
          label: 'latam',
          timeout: 60,
          status: {
            enable: true,
            message: ''
          }
        },
        {
          label: 'gol',
          timeout: 60,
          status: {
            enable: true,
            message: ''
          }
        },
        {
          label: 'azul',
          timeout: 60,
          status: {
            enable: true,
            message: ''
          }
        },
        {
          label: 'avianca',
          timeout: 60,
          status: {
            enable: true,
            message: ''
          }
        }
      ]
    };
  }

  function getMockFlightsAirlinesData() {
    return {
      outbound: [
        {
          id: 'ffb4cf3e114b95ce121ecc95f7a9685f319e02e1',
          airline: 'latam',
          from: 'REC',
          to: 'GIG',
          flightNumber: 'JJ3839',
          cabin: 'EC',
          duration: 183,
          departureDate: '2017-12-22T05:22:00Z',
          arrivalDate: '2017-12-22T09:25:00Z',
          direction: 'outbound',
          stops: 0,
          trips: [
            {
              from: 'REC',
              to: 'GIG',
              departureDate: '2017-12-22T05:22:00Z',
              arrivalDate: '2017-12-22T09:25:00Z',
              carrier: 'LATAM Airlines Brasil',
              flightNumber: 'JJ3839',
              aircraft: 'Airbus Industrie A321',
              duration: 183,
              layover: 0,
              stops: 0
            }
          ],
          availableIn: 'both',
          pricing: {
            airline: {
              adult: {
                quantity: 2,
                fare: 1031.9,
                fees: [
                  {
                    type: 'BOARDING_TAX',
                    value: 29.9
                  }
                ]
              },
              child: {
                quantity: 1,
                fare: 773.92,
                fees: [
                  {
                    type: 'BOARDING_TAX',
                    value: 29.9
                  }
                ]
              },
              fareTotal: 2837.7200000000003,
              saleTotal: 2927.42
            },
            miles: {
              adult: {
                quantity: 2,
                fare: 1167.71,
                fees: [
                  {
                    type: 'BOARDING_TAX',
                    value: 29.9
                  }
                ],
                miles: 35000
              },
              child: {
                quantity: 1,
                fare: 817.39,
                fees: [
                  {
                    type: 'BOARDING_TAX',
                    value: 29.9
                  }
                ],
                miles: 24500
              },
              fareTotal: 3152.81,
              saleTotal: 3242.51,
              milesTotal: 94500,
              offer: {
                id: null,
                username: null,
                price: 37.9125,
                base_price: 33.363,
                dynamicPriceId: 65,
                threshold: 40
              }
            }
          }
        }
      ]
    };
  }

  return {
    getMockFlightsData,
    getMockFlightsAirlinesData
  };
})();
