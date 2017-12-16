/* Build tasks */
module.exports = function(packages, config) {
  packages.gulp.task('copydist', () =>
    packages.gulp
      .src('./app/**/*.html')
      .pipe(packages.gulp.dest(`${config.distDest}/app`)));

  packages.gulp.task('babel', () =>
    packages.gulp
      .src(`${config.distDest}/js/*.js`)
      .pipe(packages.babel({
        presets: ['es2015'],
        plugins: ['transform-remove-strict-mode']
      }))
      .pipe(packages.gulp.dest(`${config.distDest}/js`)));

  packages.gulp.task('htmlmin', () =>
    packages.gulp
      .src(`${config.distDest}/**/*.html`)
      .pipe(packages.htmlmin({
        collapseWhitespace: true
      }))
      .pipe(packages.gulp.dest(`${config.distDest}/app`)));

  packages.gulp.task('uglify', () =>
    packages.gulp
      .src(`${config.distDest}/js/*.js`)
      .pipe(packages.ngAnnotate({ add: true }))
      .pipe(packages.uglify())
      .pipe(packages.gulp.dest(`${config.distDest}/js`)));

  packages.gulp.task('sass', () => {
    const sassOptions = {
      style: 'expanded',
      outputStyle: 'compressed'
    };

    return packages.gulp
      .src(`${config.distDest}/styles/index.scss`)
      .pipe(packages.sass(sassOptions).on('error', packages.sass.logError))
      .pipe(packages.autoprefixer())
      .pipe(packages.gulp.dest(`${config.distDest}/app/`));
  });

  packages.gulp.task('cssmin', () =>
    packages.gulp
      .src(`${config.distDest}/styles/*.css`)
      .pipe(packages.cleanCSS())
      .pipe(packages.gulp.dest(`${config.distDest}/styles`)));

  packages.gulp.task('useref', () =>
    packages.gulp
      .src(config.mainFile)
      .pipe(packages.useref())
      .pipe(packages.gulp.dest(config.distDest)));

  packages.gulp.task('build', cb =>
    packages.runSequence(
      'clean', 'useref', 'copydist', 'babel', ['htmlmin', 'uglify'],
      'sass', 'cssmin', cb
    ));
};
