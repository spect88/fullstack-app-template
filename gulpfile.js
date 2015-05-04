'use strict';

var gulp = require('gulp');
var reload = require('./tasks/server').reload;

var browserify = require('browserify');
var babelify = require('babelify');
var sass = require('gulp-sass');
var del = require('del');
var plumber = require('gulp-plumber');
var tap = require('gulp-tap');
var domain = require('domain');
var rename = require('gulp-rename');
var gutil = require('gulp-util');

var paths = require('./config/paths.json');

gulp.task('build:scripts', function () {
  gulp
    .src(paths.client.scripts.main, { read: false })
    .pipe(tap(function (file) {
      var d = domain.create();

      d.on('error', function (err) {
        gutil.log(
          gutil.colors.red('Browserify compile error:'), err.message,
          '\n\t', gutil.colors.cyan('in file'), file.path
        );
        gutil.beep();
      });

      d.run(function () {
        file.contents = browserify({ entries: file.path, debug: true })
          .transform(babelify)
          .bundle();
      });
    }))
    .pipe(rename('app.js'))
    .pipe(gulp.dest(paths.dist.dir))
    .pipe(reload({ stream: true }));
});

gulp.task('build:styles', function () {
  gulp
    .src(paths.client.styles.main)
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest(paths.dist.dir))
    .pipe(reload({ stream: true }));
});

gulp.task('build:public', function () {
  gulp
    .src(paths.public.dir + '/**/*.*')
    .pipe(gulp.dest(paths.dist.dir))
    .pipe(reload({ stream: true }));
});

gulp.task('build', ['build:scripts', 'build:styles', 'build:public']);

gulp.task('clean', function (cb) {
  del(['./dist'], cb);
});

gulp.task('watch', function () {
  gulp.watch(paths.client.scripts.dir + '/**/*.es6', ['build:scripts']);
  gulp.watch(paths.client.styles.dir + '/**/*.scss', ['build:styles']);
  gulp.watch(paths.public.dir + '/**/*.*', ['build:public']);
});

gulp.task('serve', ['build', 'watch', 'server:browser-sync']);

gulp.task('default', ['serve']);
