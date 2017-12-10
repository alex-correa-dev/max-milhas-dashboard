/* eslint-disable no-unused-vars */
const mockData = (function() {
  return {
    getMockflightsData
  };

  function getMockflightsData() {
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
})();
