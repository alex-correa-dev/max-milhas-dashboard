const karmaConfig = require('./karma.config.js')();

module.exports = function(config) {
  config.set({
    basePath: './',
    frameworks: ['jasmine'],
    files: karmaConfig.karma.files,
    exclude: karmaConfig.karma.exclude,
    proxies: {
      'urlRoot/': 'http://localhost:8888/'
    },
    preprocessors: karmaConfig.karma.preprocessors,
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: karmaConfig.karma.coverage.dir,
      reporters: karmaConfig.karma.coverage.reporters
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    client: karmaConfig.karma.client
  });
};
