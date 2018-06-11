const gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');

const developConfig = require('./config/webpack.dev.js');
const productionConfig = require('./config/webpack.prod.js');

gulp.task('dev', function () {
  return gulp.src('src/index.js')
    .pipe(webpackStream(developConfig, webpack))
    .pipe(gulp.dest('dist/'));
});

gulp.task('prod', function () {
  process.env.NODE_ENV = 'production';
  return gulp.src('src/index.js')
    .pipe(webpackStream(productionConfig), webpack)
    .pipe(gulp.dest('dist/'));
});

gulp.task('deploy', ['prod']);

gulp.task('default', function () {
});
