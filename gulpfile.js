const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const ghPages = require('gulp-gh-pages-with-updated-gift');

const developConfig = require('./config/webpack.dev.js');
const productionConfig = require('./config/webpack.prod.js');

gulp.task('dev', function () {
  return gulp.src('src/app.js')
    .pipe(webpackStream(developConfig, webpack))
    .pipe(gulp.dest('dist/'));
});
gulp.task('dev-server', ['dev'], function () {
  browserSync.init({
    server: {
      baseDir: "./dist/"
    },
    open: false
  });
});

gulp.task('prod', function () {
  return gulp.src('src/app.js')
    .pipe(webpackStream(productionConfig, webpack))
    .pipe(gulp.dest('dist/'));
});


gulp.task('prod-server', ['prod'], function () {
  browserSync.init({
    server: {
      baseDir: "./dist/"
    }
  });
});

gulp.task('deploy', ['prod'], function () {
  return gulp.src('./dist/**/*')
    .pipe(ghPages({
      remoteUrl: 'https://github.com/betterliyu/betterliyu.github.io.git',
      branch: 'master'
    }))
    .pipe(ghPages({
      remoteUrl: 'https://git.coding.net/betterliyu/betterliyu.coding.me.git',
      branch: 'master'
    }));
});

gulp.task('deploy2test', ['prod'], function () {
  return gulp.src('./dist/**/*')
    .pipe(ghPages({
      remoteUrl: 'https://github.com/betterliyu/betterliyu-page.git',
      branch: 'gh-pages'
    }));
});

gulp.task('default', function () {

});
