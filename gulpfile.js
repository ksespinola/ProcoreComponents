var 
  gulp = require('gulp'),
  sourcemaps = require('gulp-sourcemaps'),
  rename = require('gulp-rename'),
  webpack = require('gulp-webpack'),
  webpackServer = require('./webpack-server');


var jsPath = "lib/entry.js";
var jsOutName = "proponents.min.js";
var jsOutPath = "dist";
var jsPublicPath = "public/assets/js";

gulp.task('webpack-hot', webpackServer); 


gulp.task('build_js', function() {
  return gulp.src(jsPath)
          .pipe(webpack(require('./webpack.config.js')))
          .pipe(rename(jsOutName))
          .pipe(gulp.dest(jsOutPath))
          .pipe(gulp.dest(jsPublicPath));
});

gulp.task('dev', ['webpack-hot']); 

gulp.task('default', ['build_js']);
