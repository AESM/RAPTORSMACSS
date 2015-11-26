// gulpfile.js

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglifyJS = require('gulp-uglify'),
    gutil = require('gulp-util'),

    chalk = gutil.colors,
    destination = gulp.dest,
    greenChalk = chalk.green,
    highlightChalk = chalk.underline.cyan.bgMagenta,
    log = gutil.log,
    timestamp = (new Date()).toString(),

    input = {
      'js': './source/js/**/*.js',
      'mainscss': './source/scss/raptor.scss',
      'scss': './source/scss/**/*.scss',
      'vendorjs': './public/assets/javascripts/vendors/**/*.js'
    },
    output = {
      'stylesheets': './public/assets/stylesheets',
      'javascripts': './public/assets/javascripts'
    };

gulp.task('raptor-css', function() {
  log('Generating', highlightChalk('RAPTORSMACSS'), 'based stylesheet at', greenChalk(timestamp));
  return gulp.src(input.mainscss)
    .pipe(sourcemaps.init())
      .pipe(sass({
        style: 'expanded'
      }))
      .pipe(destination(output.stylesheets))
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(minifyCSS())
    .pipe(sourcemaps.write('./'))
    .pipe(destination(output.stylesheets));
});

gulp.task('raptor-js', function() {
  log('Generating', highlightChalk('RAPTORSMACSS'), 'based JavaScript file at', greenChalk(timestamp));
  return gulp.src([input.vendorjs, input.js])
    .pipe(sourcemaps.init())
      .pipe(concat('raptor.js'))
      .pipe(destination(output.javascripts))
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(uglifyJS())
    .pipe(sourcemaps.write('./'))
    .pipe(destination(output.javascripts));
});

gulp.task('watch', function() {
  log('Watching for changes in the', highlightChalk('RAPTORSMACSS'), 'SCSS and JS files...');
  gulp.watch(input.scss, ['raptor-css']);
  gulp.watch(input.js, ['raptor-js']);
});

gulp.task('raptor-build', ['raptor-css', 'raptor-js']);

gulp.task('default', ['raptor-build', 'watch']);