module.exports = function(packages) {
  packages.gulp.task('clean', () =>
    packages.gulp.src(['dist/', '.tmp', './coverage', 'report']).pipe(packages.clean()));
};
