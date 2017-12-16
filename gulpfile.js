const ROOT_PATH = process.cwd();

const $ = require('gulp-util');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const clean = require('gulp-clean');
const eslint = require('gulp-eslint');
const gulp = require('gulp');
const livereload = require('gulp-livereload');
const ngAnnotate = require('gulp-ng-annotate');
const nodemon = require('gulp-nodemon');
const runSequence = require('run-sequence');
const { Server } = require('karma');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

const cleanTask = require(`${ROOT_PATH}/gulp/clean`);
const testsTask = require(`${ROOT_PATH}/gulp/tests`);
const serveTask = require(`${ROOT_PATH}/gulp/serve`);
const watchTask = require(`${ROOT_PATH}/gulp/watch`);

const packages = {
  $,
  autoprefixer,
  babel,
  clean,
  eslint,
  gulp,
  livereload,
  ngAnnotate,
  nodemon,
  runSequence,
  sass,
  Server,
  sourcemaps
};

const config = {
  alljs: [
    './app/**/*.js',
    './gulp/*.js',
    './*.js'
  ],
  allClientFiles: './app/**/*',
  allJsFiles: './app/**/*.js',
  allTestFiles: './app/**/*.spec.js',
  allTestHelpers: './app/test-helpers/**/*',
  mainFile: './index.html',
  tmpDest: '.tmp',
  watchServer: ['bower.json', 'package.json', 'gulpfile.js']
};

cleanTask(packages);
testsTask(packages, config);
serveTask(packages, config);
watchTask(packages);
