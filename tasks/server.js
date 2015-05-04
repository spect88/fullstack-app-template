'use strict';

var gulp = require('gulp');
var paths = require('../config/paths.json');

var browserSync = require('browser-sync').create();
var nodemon = require('gulp-nodemon');
var portfinder = require('portfinder');

portfinder.basePort = 3005;

var devServerPort;

gulp.task('server:browser-sync', ['server:nodemon'], function () {
  browserSync.init({
    proxy: 'http://127.0.0.1:' + devServerPort
  });
});

gulp.task('server:nodemon', function (cb) {
  var called = false;

  portfinder.getPort(function (err, port) {
    if (err) throw err;
    devServerPort = port;

    nodemon({
      script: paths.server.main,
      execMap: { 'es6': 'babel-node' },
      watch: [paths.server.main, paths.server.dir],
      env: {
        'NODE_ENV': 'development',
        'PORT': devServerPort
      },
      stdout: false
    }).on('readable', function () {
      this.stdout.pipe(process.stdout);
      this.stderr.pipe(process.stderr);

      if (called) return;
      called = true;

      waitForServerToStart(this.stdout, cb);
    });
  });
});

function waitForServerToStart(stdout, cb) {
  stdout.on('data', function hasServerStarted(data) {
    if (/^Listening/.test(data.toString('utf-8'))) {
      cb();
      stdout.removeListener('data', hasServerStarted);
    }
  });
}

module.exports = {
  reload: browserSync.reload
};
