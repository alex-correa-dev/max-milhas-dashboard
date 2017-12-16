/* tasks to run development mode */
module.exports = function(packages, config) {
  packages.gulp.task('copydistdev', () => {
    packages.gulp
      .src(config.mainFile)
      .pipe(packages.gulp.dest(`${config.tmpDest}`));

    return packages.gulp
      .src([
        config.allClientFiles,
        `!${config.allTestFiles}`,
        `!${config.allTestHelpers}`
      ])
      .pipe(packages.gulp.dest(`${config.tmpDest}/app`));
  });

  packages.gulp.task('copydependenciesdev', () =>
    packages.gulp
      .src([
        'bower_components/**/*.{css,js,scss}',
        '!bower_components/**/*.min.{css,js}'
      ])
      .pipe(packages.gulp.dest(`${config.tmpDest}/bower_components`)));

  packages.gulp.task('sassdev', () => {
    const sassOptions = {
      style: 'expanded'
    };

    return packages.gulp
      .src(`${config.tmpDest}/app/index.scss`)
      .pipe(packages.sourcemaps.init())
      .pipe(packages.sass(sassOptions).on('error', packages.sass.logError))
      .pipe(packages.autoprefixer())
      .pipe(packages.sourcemaps.write())
      .pipe(packages.gulp.dest(`${config.tmpDest}/app/`));
  });

  packages.gulp.task('start', () => {
    packages
      .nodemon({
        script: config.script,
        stdout: false,
        watch: config.watchServer
      })
      .on('readable', function() {
        this.stderr.pipe(process.stderr);
        this.stdout.on('data', (chunk) => {
          if (/^Express server listening on/.test(chunk)) {
            packages.livereload.reload();
          }
          process.stdout.write(chunk);
        });
      });
  });

  packages.gulp.task('serve', cb =>
    packages.runSequence(
      'clean',
      ['copydistdev', 'copydependenciesdev'],
      'sassdev',
      ['start', 'watch'], cb
    ));
};
