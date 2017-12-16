module.exports = (packages) => {
  packages.gulp.task('watch', () => {
    packages.gulp.watch('./app/**/*.scss', ['sassdev']);
    packages.gulp.watch('./app/**/*.{js,css,html}', ['copydistdev']);
    packages.gulp.watch('./index.html', ['copydistdev']);
  });
};
