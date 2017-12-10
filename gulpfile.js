const ROOT_PATH = process.cwd();

const $ = require('gulp-util');
const clean = require('gulp-clean');
const eslint = require('gulp-eslint');
const gulp = require('gulp');
const { Server } = require('karma');

const cleanTask = require(`${ROOT_PATH}/gulp/clean`);
const testsTask = require(`${ROOT_PATH}/gulp/tests`);

const packages = {
  $,
  clean,
  eslint,
  gulp,
  Server
};

const config = {
  alljs: [
    './app/**/*.js',
    './gulp/*.js',
    './*.js'
  ]
};

cleanTask(packages);
testsTask(packages, config);
