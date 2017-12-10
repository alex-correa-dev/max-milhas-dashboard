function getKarmaOptions() {
  const externalDependencies = [
    './bower_components/angular/angular.js',
    './bower_components/angular-mocks/angular-mocks.js',
    './bower_components/angular-sanitize/angular-sanitize.js',
    './bower_components/angular-ui-router/release/angular-ui-router.js'
  ];
  const config = {
    allJsFiles: './app/**/*.js',
    specHelpers: ['./app/test-helpers/**/*.js'],
    allTestFiles: './app/**/*.spec.js'
  };
  const report = './report/';
  const options = {
    exclude: [],
    files: [].concat(
      externalDependencies,
      config.specHelpers,
      './app/test-helpers/mock-data.js',
      './app/**/*.module.js',
      './app/app.module.js',
      config.allJsFiles,
      config.allTestFiles
    ),
    coverage: {
      dir: `${report}coverage`,
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' },
        { type: 'text-summary' }
      ]
    },
    preprocessors: {},
    client: {}
  };
  options.preprocessors['./app/**/!(*.spec)+(.js)'] = ['coverage'];
  return options;
}

module.exports = function() {
  return {
    karma: getKarmaOptions()
  };
};
