const ROOT_PATH = process.cwd();

module.exports = function(packages, config) {
  function log(msg) {
    if (typeof msg === 'object') {
      for (const item in msg) {
        if (msg.hasOwnProperty(item)) {
          packages.$.log(packages.$.colors.blue(msg[item]));
        }
      }
    } else {
      packages.$.log(packages.$.colors.blue(msg));
    }
  }
  function startTests(singleRun, done) {
    function karmaCompleted(karmaResult) {
      log('Karma completed');
      if (karmaResult === 1) {
        done(`karma: tests failed with code ${karmaResult}`);
      } else {
        done();
      }
    }
    const server = new packages.Server({
      configFile: `${ROOT_PATH}/karma.conf.js`,
      singleRun: !!singleRun
    }, karmaCompleted);
    server.start();
  }
  packages.gulp.task('check', () => {
    log('Analyzing source with Eslint');
    return packages.gulp.src(config.alljs)
      .pipe(packages.eslint())
      .pipe(packages.eslint.format())
      .pipe(packages.eslint.failAfterError());
  });
  packages.gulp.task('test', ['check'], (done) => {
    startTests(true, done);
  });
};
