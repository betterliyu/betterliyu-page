const gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const ghPages = require('gulp-gh-pages');

const developConfig = require('./config/webpack.dev.js');
const productionConfig = require('./config/webpack.prod.js');

gulp.task('dev', function () {
  return gulp.src('src/index.js')
    .pipe(webpackStream(developConfig, webpack))
    .pipe(gulp.dest('dist/'));
});

gulp.task('prod', function () {
  return gulp.src('src/index.js')
    .pipe(webpackStream(productionConfig, webpack))
    .pipe(gulp.dest('dist/'));
});



gulp.task('deploy', ['prod'], function () {
  return gulp.src('./dist/**/*')
    .pipe(ghPages({
      remoteUrl: 'https://github.com/betterliyu/betterliyu.github.io.git',
      branch: 'master'
    }));
});

gulp.task('default', function () {

});
