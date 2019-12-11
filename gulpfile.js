const browserSync = require('browser-sync').create();
const env = require('gulp-env');
const gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');

gulp.task('server', () => {
  browserSync.init({
    server: {
      baseDir: "./dist/"
    },
    open: false
  });
});

gulp.task('dev', () => {
  env.set({ NODE_ENV: 'development' });
  return gulp.src('src/app.js')
    .pipe(webpackStream(require('./config/webpack.dev.js'), webpack))
    .pipe(gulp.dest('dist/'));
});

gulp.task('prod', () => {
  env.set({ NODE_ENV: 'production' });
  return gulp.src('src/app.js')
    .pipe(webpackStream(require('./config/webpack.prod.js'), webpack))
    .pipe(gulp.dest('dist/'));
});

gulp.task('dev-server', gulp.series('dev', 'server'));

gulp.task('prod-server', gulp.series('prod', 'server'));
